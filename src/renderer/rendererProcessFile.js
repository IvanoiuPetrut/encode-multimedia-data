const { createFileStatistic } = window.electronAPI.require(
  "../shared/fileStatistics"
);

const { buildHuffmanTree, generateHuffmanCodes } =
  window.electronAPI.require("../shared/huffman");

const { writeCodifiedFile } = window.electronAPI.require(
  "../shared/fileOperations"
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
    const huffmanTree = buildHuffmanTree(fileStatistic);
    const codes = generateHuffmanCodes(huffmanTree[0]);
    await writeCodifiedFile(`C:\\Personal\\test2.txt`, codes);
  } catch (err) {
    console.error("Error:", err);
  }
});

fileInput.addEventListener("change", (event) => {
  filePath = event.target.files[0].path;
  selectedFile.innerHTML = filePath;
});
