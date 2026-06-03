import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const iconDir = path.join('public', 'icons');

if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}

const createSimplePNG = (width, height, r, g, b) => {
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  const createChunk = (type, data) => {
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length);
    const typeBuffer = Buffer.from(type);
    const crcData = Buffer.concat([typeBuffer, data]);
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < crcData.length; i++) {
      crc ^= crcData[i];
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
      }
    }
    crc ^= 0xFFFFFFFF;
    const crcBuffer = Buffer.alloc(4);
    crcBuffer.writeUInt32BE(crc >>> 0);
    return Buffer.concat([length, typeBuffer, data, crcBuffer]);
  };

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rawData = [];
  for (let y = 0; y < height; y++) {
    rawData.push(0);
    for (let x = 0; x < width; x++) {
      const cx = width / 2;
      const cy = height / 2;
      const dist = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
      const maxDist = Math.min(width, height) / 2 - 4;
      const alpha = dist <= maxDist ? 255 : 0;
      rawData.push(r, g, b, alpha);
    }
  }

  const compressedData = zlib.deflateSync(Buffer.from(rawData));

  const ihdrChunk = createChunk('IHDR', ihdr);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
};

const icon192 = createSimplePNG(192, 192, 231, 76, 60);
const icon512 = createSimplePNG(512, 512, 231, 76, 60);

fs.writeFileSync(path.join(iconDir, 'icon-192x192.png'), icon192);
fs.writeFileSync(path.join(iconDir, 'icon-512x512.png'), icon512);

console.log('Icons generated successfully!');