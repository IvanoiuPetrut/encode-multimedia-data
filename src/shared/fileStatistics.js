const { readFileAsBytes } = require("./fileOperations");
const {
  writeByte,
  decimalToBinary,
  writeNBits,
  readNBits,
} = require("./bitOperations");

const STATISTIC_ENTRY_SIZE = 32;

async function createFileStatistic(filePath) {
  let fileStatistic = Array.from({ length: 256 }, () => 0);
  const file = await readFileAsBytes(filePath);
  for (let i = 0; i < file.length; i++) {
    fileStatistic[file[i]]++;
  }
  return fileStatistic;
}

async function writeStatisticsToFile(filePath, statistics) {
  let writeBuffer = [];
  statistics.forEach((entry, index) => {
    const entryBinary = decimalToBinary(entry);
    const entryLength = entryBinary.length;
    // console.log(
    //   index,
    //   ": ",
    //   entry,
    //   " -> ",
    //   entryBinary + " (" + entryLength + ")"
    // );
    writeBuffer = entryBinary.split("");
    console.log("writeBuffer: ", writeBuffer);
    writeNBits(filePath, writeBuffer, STATISTIC_ENTRY_SIZE);
  });
}

async function getFileStatistic(filePath) {
  let fileStatistic = Array.from({ length: 256 }, () => 0);
  const file = await readFileAsBytes(filePath);
  for (let i = 0; i < 256; i++) {
    const entryBinary = await readNBits(filePath, STATISTIC_ENTRY_SIZE);
    const entry = parseInt(entryBinary, 2);
    fileStatistic[i] = entry;
  }
  return fileStatistic;
}

module.exports = {
  createFileStatistic,
  writeStatisticsToFile,
  getFileStatistic,
};
