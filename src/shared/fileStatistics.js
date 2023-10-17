const { readFileAsBytes } = require("./fileOperations");

async function createFileStatistic(filePath) {
  const fileStatistic = Array.from({ length: 256 }, () => 0);
  file = await readFileAsBytes(filePath);
  for (let i = 0; i < file.length; i++) {
    fileStatistic[file[i]]++;
  }
  console.log("File statistic:", fileStatistic);
  return fileStatistic;
}

module.exports = {
  createFileStatistic,
};
