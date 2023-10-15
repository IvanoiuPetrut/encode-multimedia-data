const fs = require("fs").promises;

let bufferReader = Buffer.alloc(1);
let numberOfAvailableBitReads = 0;
let byteOffset = 0;

function isBufferReaderEmpty() {
  return numberOfAvailableBitReads === 0;
}

function readFile(filePath, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, data);
  });
}

function writeFile(filePath, content, callback) {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

async function readOneBit(filePath) {
  let buffer = null;
  try {
    if (isBufferReaderEmpty()) {
      buffer = await fs.readFile(filePath, { encoding: null });
      bufferReader = buffer[byteOffset];
      byteOffset++;
      numberOfAvailableBitReads = 7;
    }
    const bitPosition = numberOfAvailableBitReads;
    if (bufferReader === undefined) {
      console.log("Reached end of file.");
      return null;
    }
    const bit = (bufferReader >> bitPosition) & 1;
    numberOfAvailableBitReads--;
    return bit;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function readNBits(filePath, numberOfBits) {
  let bits = [];
  for (let i = 0; i < numberOfBits; i++) {
    const bit = await readOneBit(filePath);
    bits.push(bit);
  }
  return bits;
}

async function writeOneBit(filePath, bit) {
  try {
    await fs.writeFile(filePath, bit, { encoding: null });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

function extractBitFromLeftToRight(byte, bitPosition) {
  const newPosition = 7 - bitPosition;
  const bitValue = (byte >> newPosition) & 1;
  return bitValue;
}

module.exports = { readFile, writeFile, readOneBit, readNBits, writeOneBit };
