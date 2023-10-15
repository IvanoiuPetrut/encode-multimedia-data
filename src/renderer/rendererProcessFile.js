const {
  writeFile,
  readOneBit,
  readNBits,
  writeOneBit,
  readOneByte,
  createFileStatistic,
  returnHuffmanTree,
  generateHuffmanCodes,
  writeCodifiedFile,
  writeHeader,
} = window.electronAPI.require("../shared/fileOperations");

const output = document.getElementById("output");
const selectedFileEl = document.querySelector(".selected-file");
let filePath = "";

document.querySelector("#encryptButton").addEventListener("click", async () => {
  if (!filePath) {
    console.log("No file selected");
    return;
  }
  console.log(filePath);
  await createFileStatistic(filePath);
  const huffmanTree = returnHuffmanTree();
  const codes = generateHuffmanCodes(huffmanTree[0]);
  try {
    await writeCodifiedFile(`C:\\Personal\\test2.txt`, codes);
  } catch (err) {
    console.error("Error:", err);
  }
});

document.querySelector("#fileInput").addEventListener("change", (event) => {
  filePath = event.target.files[0].path;
  selectedFileEl.innerHTML = filePath;
});
