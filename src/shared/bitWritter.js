const fs = require("fs");
const buffer = [];

function writeNBits(filePath, bits, numberOfBits) {
  bits = new Array(numberOfBits - bits.length).fill(0).concat(bits);
  console.log(bits);
  for (let i = 0; i < numberOfBits; i++) {
    buffer.push(bits[i]);
    if (buffer.length === 8) {
      const writeBuffer = Buffer.alloc(1);
      writeBuffer.writeUInt8(parseInt(buffer.join(""), 2));
      console.log("buffer ", buffer);
      console.log("write ", writeBuffer);
      fs.appendFileSync(filePath, writeBuffer);
      buffer.length = 0;
    }
  }
}

module.exports = { writeNBits };
