const { readFileAsBytes } = require("./fileOperations");
const { decimalToBinary } = require("./bitOperations");
const { openFileReader, readNBits } = require("./bitReader");
const { writeNBits } = require("./bitWritter");

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
    console.log("index: ", i);
    console.log("Entry binary: ", entryBinary);
    console.log("Entry parsed: ", entry);
    console.log();
    fileStatistic[i] = entry;
  }
  return fileStatistic;
}

module.exports = {
  createFileStatistic,
  writeStatisticsToFile,
  getFileStatistic,
};
