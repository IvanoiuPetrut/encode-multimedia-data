const fs = require("fs");
const buffer = [];
// let index = 0;

function writeNBits(filePath, bits, numberOfBits) {
  bits = new Array(numberOfBits - bits.length).fill(0).concat(bits);
  for (let i = 0; i < numberOfBits; i++) {
    buffer.push(bits[i]);
    if (buffer.length === 8) {
      // console.log(index);
      // index++;
      const writeBuffer = Buffer.alloc(1);
      writeBuffer.writeUInt8(parseInt(buffer.join(""), 2));
      // console.log("buffer ", buffer);
      // console.log("write ", writeBuffer);
      fs.appendFileSync(filePath, writeBuffer);
      buffer.length = 0;
    }
  }
}

module.exports = { writeNBits };
