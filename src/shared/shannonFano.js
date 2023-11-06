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

module.exports = {
  shannonFanoCoding,
};
