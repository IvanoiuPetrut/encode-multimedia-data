const fs = require("fs").promises;

const bufferOne = [];

function decimalToBinary(decimal) {
  return (decimal >>> 0).toString(2);
}

function writeByte(filePath, buffer) {
  const bufferToWrite = Buffer.from(buffer);
  fs.appendFile(filePath, bufferToWrite);
  bufferOne.length = 0; // clear buffer
}

function bitsToByte(bits) {
  if (bits.length !== 8) {
    throw new Error("Input must be an array of 8 bits.");
  }

  return parseInt(bits.join(""), 2);
}

let buffer = [];
async function writeNBits(filePath, bits, numberOfBits) {
  bits = new Array(numberOfBits - bits.length).fill(0).concat(bits);
  console.log(bits);
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
  decimalToBinary,
  writeByte,
  writeNBits,
  byteToBits,
  bitsToByte,
};
