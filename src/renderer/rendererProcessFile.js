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
let filePath = "";

document.getElementById("readButton").addEventListener("click", async () => {
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

document.getElementById("writeButton").addEventListener("click", async () => {
  let bit;
  readOneBit("C:\\Personal\\input.txt")
    .then((b) => {
      bit = b;
      writeOneBit("C:\\Personal\\output.txt", bit);
    })
    .then(() => {
      console.log("Wrote bit:", bit);
    })
    .catch((err) => {
      console.error("Error:", err);
    });
});

document.querySelector("#fileInput").addEventListener("change", (event) => {
  console.log("File input changed:", event.target.files[0].path);
  filePath = event.target.files[0].path;
});
