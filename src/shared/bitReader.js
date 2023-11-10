const { readFileAsBytes } = require("./fileOperations");
const { byteToBits } = require("./bitOperations");

let byteOffset = 0;
let numberOfAvailableBitReads = 0;
let bufferReader = [];
let file = null;
let readBytes = [];

function isBufferReaderEmpty() {
  return numberOfAvailableBitReads === 0;
}

async function openFileReader(bytes) {
  readBytes = bytes;
}

function readByte() {
  let buffer = readBytes[byteOffset];
  buffer = byteToBits(buffer)
    .split("")
    .map((bit) => parseInt(bit));
  byteOffset++;
  numberOfAvailableBitReads = 8;
  return buffer;
}

function readNBits(numberOfBits) {
  let bits = [];
  for (let i = 0; i < numberOfBits; i++) {
    if (isBufferReaderEmpty()) {
      bufferReader = readByte();
    }
    const bit = bufferReader.shift();
    bits.push(bit);
    numberOfAvailableBitReads--;
  }
  return bits;
}

function clearBitReader() {
  byteOffset = 0;
  numberOfAvailableBitReads = 0;
  readBytes = null;
  bufferReader = [];
}

module.exports = {
  openFileReader,
  readByte,
  readNBits,
  clearBitReader,
};
