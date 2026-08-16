import fs from 'fs';
import path from 'path';

/**
 * Losslessly strip non-essential metadata from PNG buffers.
 * Preserves IHDR, PLTE, IDAT, tRNS, IEND.
 * Strips tEXt, zTXt, iTXt, eXIf, iCCP, sRGB, gAMA, cHRM, pHYs, tIME, bKGD, vpAg.
 */
function stripPng(buf) {
  if (!(buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47)) {
    return buf;
  }
  const chunks = [];
  chunks.push(buf.subarray(0, 8)); // PNG signature
  let pos = 8;
  while (pos < buf.length - 8) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const isEssential = ['IHDR', 'PLTE', 'IDAT', 'IEND', 'tRNS'].includes(type);
    if (isEssential) {
      chunks.push(buf.subarray(pos, pos + 12 + len));
    }
    pos += 12 + len;
  }
  return Buffer.concat(chunks);
}

/**
 * Losslessly strip non-essential application markers from JPEG buffers.
 * Preserves SOI, DQT, DHT, SOF, SOS, EOI.
 * Strips APP1-APP15 (EXIF, IPTC, XMP, ICC) and COM (comments).
 */
function stripJpeg(buf) {
  if (!(buf[0] === 0xff && buf[1] === 0xd8)) {
    return buf;
  }
  const chunks = [];
  chunks.push(buf.subarray(0, 2)); // SOI
  let pos = 2;
  while (pos < buf.length) {
    if (buf[pos] === 0xff) {
      const marker = buf[pos + 1];
      if (marker === 0xda) {
        // SOS (Start of Scan) - rest of buffer is compressed scan data
        chunks.push(buf.subarray(pos));
        break;
      }
      if (marker === 0xd9) {
        // EOI
        chunks.push(buf.subarray(pos, pos + 2));
        break;
      }
      if (marker === 0x00 || (marker >= 0xd0 && marker <= 0xd7)) {
        pos += 2;
        continue;
      }
      const len = buf.readUInt16BE(pos + 2);
      const isMetadata = (marker >= 0xe1 && marker <= 0xef) || marker === 0xfe;
      if (!isMetadata) {
        chunks.push(buf.subarray(pos, pos + 2 + len));
      }
      pos += 2 + len;
      continue;
    }
    pos++;
  }
  return Buffer.concat(chunks);
}

function processDirectory(dir) {
  let totalSaved = 0;
  let fileCount = 0;

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
        const orig = fs.readFileSync(fullPath);
        const stripped = entry.name.toLowerCase().endsWith('.png')
          ? stripPng(orig)
          : stripJpeg(orig);

        const saved = orig.length - stripped.length;
        if (saved > 0) {
          fs.writeFileSync(fullPath, stripped);
          const pct = ((saved / orig.length) * 100).toFixed(1);
          console.log(
            `  ✓ ${fullPath.padEnd(45)} Stripped ${saved.toString().padStart(6)} B (-${pct}%)`
          );
          totalSaved += saved;
          fileCount++;
        }
      }
    }
  }

  walk(dir);
  return { totalSaved, fileCount };
}

console.log('🧹 Stripping non-essential metadata from local static images in public/...');
const { totalSaved, fileCount } = processDirectory('public');

console.log(
  `\n✅ Cleaned ${fileCount} images, reclaimed ${(totalSaved / 1024).toFixed(2)} KB of metadata payload.\n`
);
