class Node {
  constructor(char, frequency) {
    this.char = char;
    this.frequency = frequency;
    this.left = null;
    this.right = null;
  }
}

function buildHuffmanTree(frequencyVector) {
  const nodes = Object.keys(frequencyVector).map(
    (char) => new Node(char, frequencyVector[char])
  );

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.frequency - b.frequency);
    const left = nodes.shift();
    const right = nodes.shift();

    const mergedNode = new Node(null, left.frequency + right.frequency);
    mergedNode.left = left;
    mergedNode.right = right;

    nodes.push(mergedNode);
  }

  return nodes[0]; // The root of the Huffman tree
}

// Example frequency vector
const frequencyVector = {
  A: 8,
  B: 6,
  C: 4,
  D: 1,
  E: 7,
};

const huffmanTree = buildHuffmanTree(frequencyVector);
