const fs = require("fs").promises;

let file = null;
let bufferReader = Buffer.alloc(1);
let numberOfAvailableBitReads = 0;
let byteOffset = 0;

// create a vector of apparations of each byte from 0 to 255 and initialize every value to 0
const fileStatistic = Array.from({ length: 256 }, () => 0);
const optimizedFileStatistic = Array.from({ length: 256 }, () => 0);

function isBufferReaderEmpty() {
  return numberOfAvailableBitReads === 0;
}

async function readFileAsBytes(filePath) {
  const buffer = await fs.readFile(filePath, { encoding: null });
  return buffer;
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

async function createFileStatistic(filePath) {
  if (!file) {
    file = await readFileAsBytes(filePath);
  }
  for (let i = 0; i < file.length; i++) {
    fileStatistic[file[i]]++;
  }
  console.log("File statistic:", fileStatistic);
}

class Node {
  constructor(char, frequency) {
    this.char = char;
    this.frequency = frequency;
    this.left = null;
    this.right = null;
  }
}

function buildHuffmanTree(frequencyVector) {
  const nodes = frequencyVector.map((el, index) => new Node(index, el));

  console.log("Nodes:", nodes);

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.frequency - b.frequency);
    const left = nodes.shift();
    const right = nodes.shift();

    const mergedNode = new Node(null, left.frequency + right.frequency);
    mergedNode.left = left;
    mergedNode.right = right;

    nodes.push(mergedNode);
  }

  return nodes; // The root of the Huffman tree
}

function returnHuffmanTree() {
  const huffmanTree = buildHuffmanTree(fileStatistic);
  return huffmanTree;
}

// function createOptimi
function generateHuffmanCodes(root) {
  const huffmanCodes = {};
  console.log("Root:", root[0]);

  function traverse(node, currentCode) {
    if (node.char !== null) {
      huffmanCodes[node.char] = currentCode;
      return;
    }
    if (node.left) {
      traverse(node.left, currentCode + "0");
    }
    if (node.right) {
      traverse(node.right, currentCode + "1");
    }
  }

  traverse(root, ""); // Start the traversal from the root with an empty code
  return huffmanCodes;
}

async function writeOneLetter(filePath, letter) {
  fs.writeFile(filePath, letter, { encoding: null });
}

// * filePath, file, huffmanCodes
async function writeCodifiedFile(filePath, huffmanCodes) {
  const huffmanCodesJSON = JSON.stringify(huffmanCodes);
  // console.log("bufi", huffmanCodes);
  let fullCode = `<header>${huffmanCodesJSON}</header>
  `;
  for (let i = 0; i < file.length; i++) {
    const code = huffmanCodes[file[i]];
    fullCode += code;
  }
  fs.writeFile(filePath, fullCode, { encoding: null });
}

async function writeHeader(filePath, huffmanCodes) {
  huffmanCodesArray = Object.entries(huffmanCodes);
  let header = `
  <header>
    ${huffmanCodesArray}
  </header>
  `;
  fs.writeFile(filePath, header, { encoding: null });
}

module.exports = {
  writeFile,
  readOneBit,
  readNBits,
  writeOneBit,
  readOneByte,
  createFileStatistic,
  returnHuffmanTree,
  generateHuffmanCodes,
  writeCodifiedFile,
  writeHeader,
};
