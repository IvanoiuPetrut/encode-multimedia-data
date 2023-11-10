const { createFileStatistic, writeStatisticsToFile, getFileStatistic } =
  window.electronAPI.require("../shared/fileStatistics");

const { shannonFanoCoding, writeShanonFile, decodeShannonFile } =
  window.electronAPI.require("../shared/shannonFano");

const { clearBitReader } = window.electronAPI.require("../shared/bitReader");

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
