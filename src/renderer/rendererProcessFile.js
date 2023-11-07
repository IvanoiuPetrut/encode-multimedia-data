const { createFileStatistic, writeStatisticsToFile, getFileStatistic } =
  window.electronAPI.require("../shared/fileStatistics");

const { shannonFanoCoding } = window.electronAPI.require(
  "../shared/shannonFano"
);

const { writeShanonCodes } = window.electronAPI.require(
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
    await writeStatisticsToFile("C:\\Personal\\encoded-file", fileStatistic);
    const codes = shannonFanoCoding(fileStatistic);
    await writeShanonCodes(filePath, "C:\\Personal\\encoded-file", codes);
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
    const fileStatistic = await getFileStatistic(filePath);
    console.log(fileStatistic);
  } catch (err) {
    console.error("Error:", err);
  }
});

fileInput.addEventListener("change", (event) => {
  filePath = event.target.files[0].path;
  selectedFile.innerHTML = filePath;
});
