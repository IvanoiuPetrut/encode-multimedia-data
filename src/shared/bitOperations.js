let file = null;
let bufferReader = Buffer.alloc(1);
let numberOfAvailableBitReads = 0;
let byteOffset = 0;

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

async function writeOneBit(filePath, bit) {
  try {
    await fs.writeFile(filePath, bit, { encoding: null });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

function extractBitFromLeft(byte, bitPosition) {
  const bit = (byte >> bitPosition) & 1;
  return bit;
}

module.exports = {
  readOneBit,
  readNBits,
  readOneByte,
  writeOneBit,
};
