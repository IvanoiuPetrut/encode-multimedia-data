const fs = require("fs").promises;
const { readFileAsBytes } = require("./fileOperations");

let file = null;
let bufferReader = Buffer.alloc(1);
let numberOfAvailableBitReads = 0;
let byteOffset = 0;

const bufferOne = [];

function getCode(codes, char) {
  const index = codes.findIndex((element) => element.char === char);
  return codes[index].code;
}

function decimalToBinary(decimal) {
  return (decimal >>> 0).toString(2);
}

function writeByte(filePath, buffer) {
  const bufferToWrite = Buffer.from(buffer);
  console.log("Write byte:", bufferToWrite);
  fs.appendFile(filePath, bufferToWrite);
  bufferOne.length = 0; // clear buffer
}

async function writeOneByte(filePathRead, filePathWrite, codes) {
  const file = await readFileAsBytes(filePathRead);
  console.log(file);
  for (let i = 0; i < file.length; i++) {
    const byte = file[i];
    const code = getCode(codes, byte);
    for (let j = 0; j < code.length; j++) {
      const bit = code[j];
      bufferOne.push(bit);
      if (bufferOne.length === 8) {
        writeByte(filePathWrite, bufferOne);
        bufferOne.length = 0; // clear buffer
      }
    }
  }
}

function isBufferReaderEmpty() {
  return numberOfAvailableBitReads === 0;
}

async function readOneBit(filePath) {
  try {
    if (isBufferReaderEmpty()) {
      bufferReader = await readOneByte(filePath);
    }
    const bitPosition = numberOfAvailableBitReads;
    if (bufferReader === undefined) {
      console.log("Reached end of file.");
      return null;
    }
    const bit = extractBitFromLeft(bufferReader, bitPosition);
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

async function readOneByte(filePath) {
  if (!file) {
    file = await readFileAsBytes(filePath);
  }
  const byte = file[byteOffset];
  console.log("Read byte:", byte);
  byteOffset++;
  numberOfAvailableBitReads = 7;
  return byte;
}

function extractBitFromLeft(byte, bitPosition) {
  const bit = (byte >> bitPosition) & 1;
  return bit;
}

module.exports = {
  readOneBit,
  readNBits,
  readOneByte,
  writeOneByte,
  decimalToBinary,
};