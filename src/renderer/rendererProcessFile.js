const { createFileStatistic, writeStatisticsToFile, getFileStatistic } =
  window.electronAPI.require("../shared/fileStatistics");

const { shannonFanoCoding, writeShanonFile, decodeShannonFile } =
  window.electronAPI.require("../shared/shannonFano");

const { clearBitReader } = window.electronAPI.require("../shared/bitReader");

const { writeNBits } = window.electronAPI.require("../shared/bitWritter.js");

const selectedFile = document.querySelector(".selected-file"),
  encryptButton = document.querySelector("#encryptButton"),
  decryptButton = document.querySelector("#decryptButton"),
  testButton = document.querySelector("#testButton"),
  fileInput = document.querySelector("#fileInput");

let filePath = "";

encryptButton.addEventListener("click", async () => {
  if (!filePath) {
    console.log("No file selected");
    return;
  }
  try {
    clearBitReader();
    const fileName = Date.now().toString() + "-encoded";
    const fileStatistic = await createFileStatistic(filePath);
    await writeStatisticsToFile(`D:\\${fileName}`, fileStatistic);
    const codes = shannonFanoCoding(fileStatistic);
    await writeShanonFile(filePath, `D:\\${fileName}`, codes);
  } catch (err) {
    console.error("Error:", err);
  }
});

decryptButton.addEventListener("click", async () => {
  if (!filePath) {
    console.log("No file selected");
    return;
  }
  try {
    clearBitReader();
    const fileName = Date.now().toString() + "-decoded";
    const fileStatistic = await getFileStatistic(filePath);
    const codes = shannonFanoCoding(fileStatistic);
    await decodeShannonFile(filePath, `D:\\${fileName}`, codes);
  } catch (err) {
    console.error("Error:", err);
  }
});

fileInput.addEventListener("change", (event) => {
  filePath = event.target.files[0].path;
  selectedFile.innerHTML = filePath;
});

testButton.addEventListener("click", () => {
  const length = 32;
  const bits1 = [1, 1, 1, 1, 1, 1, 1, 1];
  const bits2 = [0, 1, 0, 1, 1, 0, 0, 0];

  for (let i = 0; i < 50; i++) {
    if (i % 2 === 0) {
      writeNBits("C:\\Personal\\test1", bits1, length);
    } else {
      writeNBits("C:\\Personal\\test1", bits2, length);
    }
  }
});
