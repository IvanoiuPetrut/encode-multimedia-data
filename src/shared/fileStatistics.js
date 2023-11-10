const { decimalToBinary } = require("./bitOperations");
const { openFileReader, readNBits } = require("./bitReader");
const { writeNBits } = require("./bitWritter");

const STATISTIC_ENTRY_SIZE = 32;

async function createFileStatistic(bytes) {
  let fileStatistic = Array.from({ length: 256 }, () => 0);
  for (let i = 0; i < bytes.length; i++) {
    fileStatistic[bytes[i]]++;
  }
  return fileStatistic;
}

async function writeStatisticsToFile(filePath, statistics) {
  let writeBuffer = [];
  statistics.forEach((entry) => {
    const entryBinary = decimalToBinary(entry);
    writeBuffer = entryBinary.split("");
    writeNBits(filePath, writeBuffer, STATISTIC_ENTRY_SIZE);
  });
}

async function getFileStatistic(filePath) {
  let fileStatistic = Array.from({ length: 256 }, () => 0);
  await openFileReader(filePath);
  for (let i = 0; i < 256; i++) {
    const entryBinaryArray = await readNBits(STATISTIC_ENTRY_SIZE);
    const entryBinary = entryBinaryArray.join("");
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
