const { readFileAsBytes } = require("./fileOperations");
const { byteToBits } = require("./bitOperations");

let byteOffset = 0;
let numberOfAvailableBitReads = 0;
let file = null;

function isBufferReaderEmpty() {
  return numberOfAvailableBitReads === 0;
}

async function openFileReader(filePath) {
  file = await readFileAsBytes(filePath);
  console.log(file);
}

function readByte() {
  let buffer = file[byteOffset];
  buffer = byteToBits(buffer)
    .split("")
    .map((bit) => parseInt(bit));
  byteOffset++;
  numberOfAvailableBitReads = 8;
  return buffer;
}

function readNBits(numberOfBits) {
  let bits = [];
  let byte = null;
  for (let i = 0; i < numberOfBits; i++) {
    if (isBufferReaderEmpty()) {
      byte = readByte();
    }
    const bit = byte.shift();
    bits.push(bit);
    numberOfAvailableBitReads--;
  }
  console.log("bits from read n bits: ", bits);
  return bits;
}

module.exports = {
  openFileReader,
  readByte,
  readNBits,
};
