const { writeNBits } = require("./bitOperations/bitWritter");
const { readNBits, openFileReader } = require("./bitOperations/bitReader");
const { bitsToByte, byteToBits } = require("./bitOperations/bitOperations");

class Node {
  constructor(char, frequency) {
    this.char = char;
    this.frequency = frequency;
    this.code = null;
  }
}

function findIndexForOptimHalf(nodes) {
  const total = nodes.reduce((acc, node) => acc + node.frequency, 0);
  let leftSum = 0;
  let rightSum = total;
  let minimum = Infinity;
  for (let i = 0; i < nodes.length; i++) {
    leftSum += nodes[i].frequency;
    rightSum -= nodes[i].frequency;
    const difference = Math.abs(leftSum - rightSum);
    if (difference < minimum) {
      minimum = difference;
    } else {
      return i;
    }
  }
  return nodes.length - 1;
}

function shannonFanoCoding(frequencyVector) {
  let nodes = frequencyVector.map((el, index) => new Node(index, el));
  nodes = nodes.filter((node) => node.frequency !== 0); // remove zero frequencies
  nodes.sort((a, b) => a.frequency - b.frequency);
  const codes = [];

  function traverse(nodes, code = "") {
    if (nodes.length === 1) {
      nodes[0].code = code;
      codes.push(nodes[0]);
      return;
    }

    const index = findIndexForOptimHalf(nodes);
    const left = nodes.slice(0, index);
    const right = nodes.slice(index);
    traverse(left, code + "0");
    traverse(right, code + "1");
  }

  traverse(nodes);

  return codes;
}

function getCode(codes, char) {
  const index = codes.findIndex((element) => element.char === char);
  return codes[index].code;
}

async function writeShanonFile(byteStream, filePathWrite, codes) {
  await openFileReader(byteStream);
  let byte = await readNBits(8);
  byte = bitsToByte(byte);
  while (byte.length !== 0) {
    const code = getCode(codes, byte);
    writeNBits(filePathWrite, code.split(""), code.length);
    byte = await readNBits(8);
    byte = bitsToByte(byte);
  }
  writeNBits(filePathWrite, [0], 7);
  console.log("File written.");
}

function getByteFromCode(codes, code) {
  const index = codes.findIndex((element) => element.code === code);
  return index === -1 ? null : codes[index].char;
}

async function decodeShannonFile(byteStream, filePathWrite, codes) {
  await openFileReader(byteStream);
  let bit = await readNBits(1);
  let readBuffer = [];

  while (bit.length !== 0) {
    readBuffer.push(bit[0]);
    console.log("Read buffer: ", readBuffer);
    const byte = getByteFromCode(codes, readBuffer.join(""));
    console.log("Byte decoded: ", byte);
    if (byte !== null) {
      const bits = byteToBits(byte).split("");
      console.log("Bits decoded: ", bits);
      writeNBits(filePathWrite, bits, bits.length);
      readBuffer = [];
    }
    bit = await readNBits(1);
  }
}

module.exports = {
  shannonFanoCoding,
  writeShanonFile,
  decodeShannonFile,
};
