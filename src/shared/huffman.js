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
  console.log(nodes);
  while (nodes.length > 1) {
    nodes.sort((a, b) => a.frequency - b.frequency);
    const left = nodes.shift();
    const right = nodes.shift();

    const mergedNode = new Node(null, left.frequency + right.frequency);
    mergedNode.left = left;
    mergedNode.right = right;

    nodes.push(mergedNode);
  }

  return nodes;
}

function generateHuffmanCodes(root) {
  const huffmanCodes = {};

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

  traverse(root, "");
  return huffmanCodes;
}

module.exports = {
  buildHuffmanTree,
  generateHuffmanCodes,
};
