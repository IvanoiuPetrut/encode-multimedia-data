const { readFileAsBytes } = require("./fileOperations");
const { writeByte, decimalToBinary } = require("./bitOperations");

async function createFileStatistic(filePath) {
  let fileStatistic = Array.from({ length: 256 }, () => 0);
  const file = await readFileAsBytes(filePath);
  for (let i = 0; i < file.length; i++) {
    fileStatistic[file[i]]++;
  }
  return fileStatistic;
}

async function writeFileStatistic(filePath, codes) {
  codes.forEach((code) => {
    codeFrequencyBinary = decimalToBinary(code.frequency);
    codeLengthBinary = decimalToBinary(code.code.length);
    writeByte(filePath, codeFrequencyBinary);
    writeByte(filePath, codeLengthBinary);
  });
  return fileStatistic;
}

async function getFileStatistic(filePath) {
  let fileStatistic = Array.from({ length: 256 }, () => 0);
  const file = await readFileAsBytes(filePath);
  for (let i = 0; i < 256; i++) {
    fileStatistic[file[i]]++;
  }
  return fileStatistic;
}

module.exports = {
  createFileStatistic,
};
