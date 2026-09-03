---
slug: postgresql-internals-pages-tuples-mvcc
title: 'PostgreSQL Internals: Pages, Tuples, and MVCC'
excerpt: >-
  A comprehensive deep dive into PostgreSQL storage internals—covering 8 KB pages,
  the heap, tuple line pointers, ctid coordinates, B-Tree indexes, and MVCC visibility.
category: Engineering
categoryColor: bg-brandpurple/10 text-brandpurple
date: '2026-08-26'
readTime: 10 min read
author: instudia Technical Team
authorRole: Training
authorPhoto: >-
  https://ik.imagekit.io/dxffek9yf/blogman/authors/new-logo-with-white-bg.png
coverImage: >-
  https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80
ogImage: >-
  https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80
authorSlug: instudia-team
dateModified: '2026-08-26'
---

When writing SQL, developers operate primarily with clean relational abstractions: tables, rows, and columns. We issue queries, filter records with indexes, and update values assuming the database modifies data in place.

Under the hood, however, PostgreSQL manages data through a very specific physical architecture. It organizes disk files into uniform 8 KB pages, stores rows as versioned tuples within an unordered heap, references records through physical coordinates called `ctid` pointers, and maintains transaction isolation using Multi-Version Concurrency Control (MVCC).

Understanding these mechanical realities is essential for diagnosing table bloat, tuning index performance, understanding query execution plans, and managing long-running transaction locks.

---

## The Physical Storage Layer: Files, Pages, and the Heap

### Tables as Operating System Files

In PostgreSQL, every relation (table) maps to physical files on the host file system. These files reside within the database cluster directory (specifically under `base/<database_oid>/<relfilenode>`).

PostgreSQL structures each table file as a contiguous array of fixed-size blocks called **Pages** (or disk blocks).

```text
+-----------------------------------------------------------------------+
|                              Table File                               |
+-------------------+-------------------+-------------------+-----------+
|   Page 0 (8 KB)   |   Page 1 (8 KB)   |   Page 2 (8 KB)   |    ...    |
+-------------------+-------------------+-------------------+-----------+
  Offset 0            Offset 8192         Offset 16384
```

- **Default Page Size:** By default, PostgreSQL compiles with an 8 KB (8,192 bytes) page size.
- **Direct Offset Calculation:** Because every block is identical in size, PostgreSQL calculates the exact disk byte offset of any page using basic arithmetic:

```text
Byte Offset = Page Number * 8192
```

When reading a table, the database engine does not pull fractional bytes from disk. It issues a file seek to that byte offset and reads the entire 8 KB page into memory, caching it in **Shared Buffers**.

### What is the Heap?

In database literature, the term **Heap** refers to the unordered collection of table pages on disk and in memory where actual row data lives.

Unlike database engines that cluster tables directly inside a primary key B+ Tree index (such as MySQL InnoDB), PostgreSQL keeps table data in an unordered heap. Rows are stored in whichever page currently has sufficient free space, completely independent of primary key ordering.

---

## Anatomy of an 8 KB Page

A PostgreSQL page must store variable-length rows, track available space, and prevent internal fragmentation. To accomplish this, every 8 KB page is divided into four distinct regions.

```text
+-----------------------------------------------------------------------+
|  PageHeaderData (24 bytes)                                            |
|  - LSN, checksum, free space offsets (pd_lower, pd_upper)             |
+-----------------------------------------------------------------------+
|  Line Pointer Array (ItemIds)                                         |
|  [ Line Pointer 1 ] -> Offset to Tuple 1                              |
|  [ Line Pointer 2 ] -> Offset to Tuple 2                              |
|  [ Line Pointer 3 ] -> Offset to Tuple 3                              |
|  |                                                                    |
|  v (Grows Downward)                                                   |
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
|                                                                       |
|                          Unallocated Free Space                       |
|                                                                       |
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
|  ^ (Grows Upward)                                                     |
|  |                                                                    |
|  [ Tuple 3 Data (Header + Columns) ]                                  |
|  [ Tuple 2 Data (Header + Columns) ]                                  |
|  [ Tuple 1 Data (Header + Columns) ]                                  |
+-----------------------------------------------------------------------+
```

### 1. Page Header (24 Bytes)
The page header contains internal metadata, including the Write-Ahead Log sequence number (LSN), page flags, and two dynamic boundary pointers:
- `pd_lower`: Byte offset marking the end of the line pointer array.
- `pd_upper`: Byte offset marking the start of the unallocated tuple data space.

### 2. Line Pointer Array (`ItemIdData`)
Immediately following the page header is an array of 4-byte line pointers (item pointers). Each line pointer records:
- The exact byte offset where the tuple data begins at the bottom of the page.
- The length of the tuple.
- Flags indicating the tuple state (used, dead, redirected).

Line pointers grow **downward** as new rows are added.

### 3. Free Space
The contiguous memory span between `pd_lower` and `pd_upper`. When `pd_lower` meets `pd_upper`, the page is considered full.

### 4. Tuple Data
The raw binary payload containing row headers and column data. Tuples are inserted starting from the very end of the 8 KB block and grow **upward**.

This bidirectional growth architecture ensures that variable-length rows can be stored efficiently without needing to reorganize the entire page when rows vary in length.

---

## Tuples and the `ctid` Coordinate System

In PostgreSQL terminology, a logical row may exist as multiple physical versions over time. Each physical version of a row stored in the heap is called a **Tuple**.

Every tuple is addressed by an internal identifier known as the **Current Tuple ID (`ctid`)**:

```text
ctid = (Block Number, Line Pointer Index)
```

For instance, a tuple with `ctid` `(0, 1)` represents:
- **Block Number:** Page `0` (the first page in the table file).
- **Index:** Line Pointer `1` within that page.

```text
                  Page 0
+------------------------------------------+
| Page Header                              |
| [Line Pointer 1] -------------------+    |
| [Line Pointer 2] ------------+      |    |
| ...                          |      |    |
| Free Space                   |      |    |
| ...                          |      |    |
| Tuple 2: (id=200, price=$5) <+      |    |
| Tuple 1: (id=100, price=$10) <------+    |
+------------------------------------------+
```

### The Architectural Advantage of `ctid`
The `ctid` provides direct physical indexing. When PostgreSQL knows a tuple's `ctid`, it does not search or scan; it reads the target 8 KB page, follows the line pointer offset, and accesses the tuple immediately in constant O(1) time.

---

## How Secondary Indexes Connect to the Heap

When you create an index (such as a standard B-Tree index on a column like `item_id`), PostgreSQL constructs a separate tree structure stored in its own index file.

The leaf pages of a PostgreSQL B-Tree index do not hold full row records. Instead, they store simple pairs of `(Indexed Value, ctid)`.

```text
                    B-Tree Index (Leaf Pages)
               +----------------------------------+
               | Key: 100  ->  ctid: (0, 1)       |
               | Key: 200  ->  ctid: (0, 2)       |
               | Key: 700  ->  ctid: (1, 5)       |
               +-----------------+----------------+
                                 |
           +---------------------+
           v
      Heap Page 0
+-----------------------------------------------+
| Line Pointer 1 -> Tuple 1: (100, $10)         |
| Line Pointer 2 -> Tuple 2: (200, $5)          |
+-----------------------------------------------+
```

### Step-by-Step Index Scan Flow
1. The database traverses the B-Tree index starting from the root down to the appropriate leaf page.
2. It locates the matching search key (e.g., `item_id = 100`) and retrieves the physical pointer `ctid: (0, 1)`.
3. It accesses Heap Page `0` in Shared Buffers (or reads it from disk if not cached).
4. It reads Line Pointer `1` to locate the tuple on disk, checks transaction visibility, and extracts the requested columns.

---

## Non-In-Place Updates and Append-Only Storage

A defining characteristic of PostgreSQL is that **it does not overwrite existing data in place during an update**. 

When an `UPDATE` command executes:
1. PostgreSQL writes a brand-new tuple version containing the updated values into an available space in the heap.
2. It allocates a new line pointer and generates a new `ctid` for that new tuple.
3. It inserts a new entry into all corresponding indexes pointing to the new `ctid`.

### Example: Updating a Record

Consider updating the price of item `100` from `$10` to `$20`:

```sql
UPDATE items SET price = 20 WHERE item_id = 100;
```

PostgreSQL places the new tuple version at Line Pointer `3` on Page `0`:

```text
                        Heap Page 0
+-------------------------------------------------------------+
| Line Pointer 1 ----------------> Tuple 1: (id=100, price=$10) |  (Old Version)
| Line Pointer 2 ----------------> Tuple 2: (id=200, price=$5)  |
| Line Pointer 3 ----------------> Tuple 3: (id=100, price=$20) |  (New Version)
+-------------------------------------------------------------+
```

Meanwhile, the B-Tree index leaf page is updated to include both entries:

```text
              Index Leaf Node for item_id
+-------------------------------------------------------------+
| Key: 100  ->  ctid: (0, 1)   (Old tuple version)            |
| Key: 100  ->  ctid: (0, 3)   (New tuple version)            |
| Key: 200  ->  ctid: (0, 2)                                  |
+-------------------------------------------------------------+
```

When a subsequent query runs `SELECT price FROM items WHERE item_id = 100;`, the index returns two matching entries: `(0, 1)` and `(0, 3)`. 

To decide which version of the row a query should receive, PostgreSQL relies on its transaction visibility mechanism.

---

## Visibility Mechanics: `xmin` and `xmax` Headers

To support Multi-Version Concurrency Control (MVCC) without acquiring shared read locks on table data, PostgreSQL includes system headers in every tuple:

- `xmin`: The 32-bit Transaction ID (XID) that inserted and created this tuple version.
- `xmax`: The 32-bit Transaction ID that updated or deleted (superseded) this tuple version. If the tuple is active and has not been modified, `xmax` is `0`.

```text
+---------------------------------------------------------------------------------------+
| Line Pointer | xmin | xmax | Tuple Payload (Columns)                                  |
+--------------+------+------+----------------------------------------------------------+
| (0, 1)       | 1    | 7    | item_id: 100, price: $10 (Created by Tx 1, ended by Tx 7) |
| (0, 2)       | 2    | 0    | item_id: 200, price: $5  (Created by Tx 2, active)       |
| (0, 3)       | 7    | 0    | item_id: 100, price: $20 (Created by Tx 7, active)       |
+---------------------------------------------------------------------------------------+
```

### Resolving Query Visibility with Snapshots

Every transaction operates with an active database **Snapshot**. A snapshot defines the boundary of committed, active, and future transactions relative to the running query.

Let us trace how two concurrent transactions observe the table after Transaction `7` commits:

```text
Transaction Timeline:
---------------------------------------------------------------------------->
Tx 1 (Insert $10)   Tx 5 (Started)   Tx 7 (Update $20 & Commit)   Tx 10 (Started)
```

### Scenario 1: New Transaction (Transaction 10)
1. Transaction `10` starts after Transaction `7` has completed and committed.
2. It queries: `SELECT price FROM items WHERE item_id = 100;`.
3. The index returns two candidate `ctid` pointers: `(0, 1)` and `(0, 3)`.
4. PostgreSQL visits the heap to inspect the visibility headers:
   - Tuple `(0, 1)`: `xmin = 1`, `xmax = 7`. Because Transaction `7` committed before Transaction `10` began, this version is dead to Transaction `10`.
   - Tuple `(0, 3)`: `xmin = 7`, `xmax = 0`. Transaction `7` is committed and no transaction has deleted this record.
5. The database returns **`$20`**.

### Scenario 2: Long-Running Transaction (Transaction 5)
1. Transaction `5` started earlier, before Transaction `7` executed.
2. It executes the identical query: `SELECT price FROM items WHERE item_id = 100;`.
3. The index returns both `(0, 1)` and `(0, 3)`.
4. Visibility inspection:
   - Tuple `(0, 1)`: `xmin = 1`, `xmax = 7`. Because Transaction `7` is in the future relative to Transaction `5`'s snapshot horizon, Transaction `5` cannot see modifications made by Transaction `7`. The `xmax = 7` is ignored.
   - Tuple `(0, 3)`: `xmin = 7`. This tuple was created after Transaction `5` started, making it completely invisible to Transaction `5`.
5. The database returns **`$10`**.

Through this mechanism, both transactions read consistent, isolated data concurrently without blocking one another.

---

## Dead Tuples, Snapshot Pinning, and Table Bloat

While append-only MVCC enables high read/write concurrency, it introduces storage management overhead.

```text
                  Oldest Active Snapshot Horizon (Tx 5)
                                |
                                v
--------------------------------+----------------------------------------> Time
Past Transactions               | Future Transactions
(Tx 1, Tx 2)                    | (Tx 7, Tx 10)
                                |
Old Tuple (0, 1)                | New Tuple (0, 3)
[ xmin: 1, xmax: 7 ]            | [ xmin: 7, xmax: 0 ]
   ^                            |
   |                            |
   +-- PINNED: Cannot be purged |
```

### The Definition of a Dead Tuple
A tuple is only considered **dead** when its `xmax` is older than the oldest active transaction snapshot in the database cluster. 

As long as an open transaction (like Transaction `5`) can still legitimately view an older tuple version, that tuple is **alive** and cannot be removed.

### Snapshot Pinning and Bloat
When long-running queries, idle transactions with uncommitted blocks (`IDLE in transaction`), or abandoned connection pool handles remain open:
- They pin the global snapshot horizon in place.
- Superseded tuples generated by newer transactions cannot be cleaned up.
- The table and its indexes grow in size on disk even if the net number of logical rows remains unchanged. This condition is called **Table and Index Bloat**.

### The Role of `VACUUM`
The PostgreSQL `VACUUM` worker scans heap pages and index structures to:
1. Reclaim space from dead tuples whose `xmax` is safely behind the global horizon.
2. Shift `pd_upper` or mark line pointers as reusable within each 8 KB page.
3. Remove pointing index entries from secondary B-Trees.

`VACUUM` does not typically shrink table file sizes on the operating system file system; instead, it creates reusable space inside existing 8 KB pages so upcoming `INSERT` and `UPDATE` commands do not allocate additional disk blocks.

---

## Core Architectural Summary

| Layer | Physical Unit | Responsibility | Key Engineering Mechanism |
| :--- | :--- | :--- | :--- |
| **Table File** | Array of 8 KB Pages | On-disk relation storage | Direct byte offset seeking: `Page Number * 8192`. |
| **Heap Page** | 8,192-byte block | Atomic memory/disk block | Line pointers grow down, tuple data grows up. |
| **Tuple** | Physical row version | Concrete row snapshot | Identified by `ctid (page, line_pointer)`. |
| **B-Tree Index** | Balanced tree | Fast lookup engine | Stores `(Indexed Value, ctid)` pairs at leaf level. |
| **Visibility** | `xmin` / `xmax` headers | Snapshot isolation | Evaluated at read time to determine which tuple version is returned. |
| **Maintenance** | `VACUUM` | Space reclamation | Sweeps dead tuples past the oldest snapshot horizon to prevent bloat. |

---

## Final Thoughts

PostgreSQL’s physical storage engine is built around deliberate architectural trade-offs:

1. Storing rows in an **unordered heap of 8 KB pages** keeps writes fast and reduces page-level contention.
2. Using **line pointers and `ctid` coordinates** allows constant-time in-page resolution.
3. Implementing **append-only updates with `xmin`/`xmax` headers** allows concurrent reads and writes without shared locks.
4. Running **background `VACUUM` operations** maintains bounded disk usage in an append-only architecture.

Keeping these foundational internals in mind makes it much easier to write efficient queries, design performant indexes, and keep your production databases healthy.

For more distributed database architectures and engineering trade-offs, explore our [System Design Fundamentals Guide](/blog/system-design-complete-guide-for-students), our analysis of the [Axios npm Supply Chain Incident](/blog/axios-supply-chain-compromise-2026), and our [Fullstack Web Development Course](/courses/fullstack-web-development).

You can also explore our [Backend Development Program](/courses/backend-development) and [DevOps & Cloud Services Track](/courses/learn-devops-cloud-services) to learn database administration and production deployment in hands-on labs at instudia Dimapur.
