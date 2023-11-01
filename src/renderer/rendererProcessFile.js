const { createFileStatistic, writeStatisticsToFile, getFileStatistic } =
  window.electronAPI.require("../shared/fileStatistics");

const { buildHuffmanTree, generateHuffmanCodes } =
  window.electronAPI.require("../shared/huffman");

const { writeCodifiedFile } = window.electronAPI.require(
  "../shared/fileOperations"
);

const { shannonFanoCoding, assignCodesToTree } = window.electronAPI.require(
  "../shared/shannonFano"
);

const { writeOneByte, decimalToBinary } = window.electronAPI.require(
  "../shared/bitOperations"
);

const selectedFile = document.querySelector(".selected-file"),
  encryptButton = document.querySelector("#encryptButton"),
  decryptButton = document.querySelector("#decryptButton"),
  fileInput = document.querySelector("#fileInput");

let filePath = "";

encryptButton.addEventListener("click", async () => {
  if (!filePath) {
    console.log("No file selected");
    return;
  }
  try {
    const fileStatistic = await createFileStatistic(filePath);
    console.log(fileStatistic);
    await writeStatisticsToFile("D:\\test2", fileStatistic);
    // const codes = shannonFanoCoding(fileStatistic);
    // console.log("Codes: ", codes);
    // await writeOneByte(filePath, "C:\\test2.txt", codes);
  } catch (err) {
    console.error("Error:", err);
  }
});

decryptButton.addEventListener("click", async () => {
  // if (!filePath) {
  //   console.log("No file selected");
  //   return;
  // }
  try {
    const fileStatistic = await getFileStatistic(filePath);
    console.log(fileStatistic);
    // console.log(decimalToBinary(2));
    // const codes = shannonFanoCoding(fileStatistic);
    // console.log("Codes: ", codes);
    // await writeOneByte(filePath, "C:\\Personal\\test2.txt", codes);
    // await writeCodifiedFile(`C:\\Personal\\test2.txt`, codes);
  } catch (err) {
    console.error("Error:", err);
  }
});

fileInput.addEventListener("change", (event) => {
  filePath = event.target.files[0].path;
  selectedFile.innerHTML = filePath;
});
