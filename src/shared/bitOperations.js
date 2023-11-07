const fs = require("fs").promises;
const { readFileAsBytes } = require("./fileOperations");

let numberOfAvailableBitReads = 0;
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
  fs.appendFile(filePath, bufferToWrite);
  bufferOne.length = 0; // clear buffer
}

async function writeShanonCodes(filePathRead, filePathWrite, codes) {
  const file = await readFileAsBytes(filePathRead);
  for (let i = 0; i < file.length; i++) {
    const byte = file[i];
    const code = getCode(codes, byte);
    writeNBits(filePathWrite, code.split(""), code.length);
  }
  writeNBits(filePathWrite, [0, 0, 0, 0, 0, 0, 0], 7);
  console.log("File written.");
}

function isBufferReaderEmpty() {
  return numberOfAvailableBitReads === 0;
}

function extractBitFromLeft(byte, bitPosition) {
  const bit = (byte >> bitPosition) & 1;
  return bit;
}

let buffer = [];
// let index = 0;
async function writeNBits(filePath, bits, numberOfBits) {
  bits = new Array(numberOfBits - bits.length).fill(0).concat(bits);
  // console.log("index: ", index, "bits: ", bits);
  // index++;
  for (let i = 0; i < numberOfBits; i++) {
    buffer.push(bits[i]);
    if (buffer.length === 8) {
      const writeBuffer = Buffer.alloc(1);
      writeBuffer.writeUInt8(parseInt(buffer.join(""), 2));
      fs.appendFile(filePath, writeBuffer);
      buffer.length = 0;
    }
  }
}

function byteToBits(byteValue) {
  if (byteValue < 0 || byteValue > 255 || !Number.isInteger(byteValue)) {
    throw new Error("Input must be an integer between 0 and 255.");
  }

  return byteValue.toString(2).padStart(8, "0");
}

module.exports = {
  writeShanonCodes,
  decimalToBinary,
  writeByte,
  writeNBits,
  byteToBits,
};
