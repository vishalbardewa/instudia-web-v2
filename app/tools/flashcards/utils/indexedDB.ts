import { SavedDeck } from '../types';

const DB_NAME = 'InstudiaFlashcardsDB';
const DB_VERSION = 1;
const STORE_NAME = 'decks';

let dbPromise: Promise<IDBDatabase> | null = null;

const getDB = (): Promise<IDBDatabase> => {
  if (typeof window === 'undefined') return Promise.reject('IndexedDB is not available on server');

  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (e) => reject('IndexedDB error: ' + (e.target as any).error);

      request.onsuccess = (e) => {
        resolve((e.target as any).result);
      };

      request.onupgradeneeded = (e) => {
        const db = (e.target as any).result as IDBDatabase;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
    });
  }
  return dbPromise;
};

export const saveDeck = async (deck: SavedDeck): Promise<void> => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(deck);
    
    request.onsuccess = () => resolve();
    request.onerror = (e) => reject('Error saving deck: ' + (e.target as any).error);
  });
};

export const getAllDecks = async (): Promise<SavedDeck[]> => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    
    request.onsuccess = (e) => {
      // Sort by newest first
      const decks = (e.target as any).result as SavedDeck[];
      decks.sort((a, b) => b.createdAt - a.createdAt);
      resolve(decks);
    };
    
    request.onerror = (e) => reject('Error loading decks: ' + (e.target as any).error);
  });
};

export const deleteDeck = async (id: string): Promise<void> => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);
    
    request.onsuccess = () => resolve();
    request.onerror = (e) => reject('Error deleting deck: ' + (e.target as any).error);
  });
};
