const { readFileAsBytes } = window.electronAPI.require(
  "../shared/fileOperations"
);

const { createFileStatistic, writeStatisticsToFile, getFileStatistic } =
  window.electronAPI.require("../shared/fileStatistics");

const { shannonFanoCoding, writeShanonFile, decodeShannonFile } =
  window.electronAPI.require("../shared/shannonFano");

const { clearBitReader } = window.electronAPI.require("../shared/bitReader");

const selectedFile = document.querySelector(".selected-file"),
  encryptButton = document.querySelector("#encryptButton"),
  decryptButton = document.querySelector("#decryptButton"),
  fileInput = document.querySelector("#fileInput"),
  showCodesCheckbox = document.querySelector("#showCodes"),
  codesTable = document.querySelector("#codesTable"),
  textForEncrypt = document.querySelector("#textForEncrypt");

let filePath = "";
let isShowCodesChecked = false;

encryptButton.addEventListener("click", async () => {
  if (!filePath && !textForEncrypt.value) {
    console.log("No file selected");
    return;
  }
  try {
    clearBitReader();
    let bytes = null;
    if (textForEncrypt.value) {
      const encoder = new TextEncoder();
      bytes = encoder.encode(textForEncrypt.value);
    } else {
      bytes = await readFileAsBytes(filePath);
    }

    const fileStatistic = await createFileStatistic(bytes);
    // await writeStatisticsToFile(`D:\\${fileName}`, fileStatistic);

    const codes = shannonFanoCoding(fileStatistic);
    if (isShowCodesChecked) {
      addCodesToTable(codes, codesTable);
    }

    let fileName = "";
    if (textForEncrypt.value) {
      const date = new Date();
      fileName = `text-${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.sh`;
    } else {
      fileName = `${filePath.split("\\")[filePath.split("\\").length - 1]}.sh`;
    }

    if (textForEncrypt.value) {
      await writeStatisticsToFile(`D:\\${fileName}`, fileStatistic);
      await writeShanonFile(bytes, `D:\\${fileName}`, codes);
    } else {
      console.log("File path: ", filePath);
      await writeStatisticsToFile(`D:\\${fileName}`, fileStatistic);
      await writeShanonFile(bytes, `D:\\${fileName}`, codes);
    }

    // await writeShanonFile(filePath, `D:\\${fileName}`, codes);
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
    const bytes = await readFileAsBytes(filePath);
    const fileName = Date.now().toString() + "-decoded";
    const fileStatistic = await getFileStatistic(bytes);
    const codes = shannonFanoCoding(fileStatistic);
    await decodeShannonFile(bytes, `D:\\${fileName}`, codes);
  } catch (err) {
    console.error("Error:", err);
  }
});

fileInput.addEventListener("change", (event) => {
  filePath = event.target.files[0].path;
  selectedFile.innerHTML = filePath;
});

showCodesCheckbox.addEventListener("change", (event) => {
  isShowCodesChecked = event.target.checked;
  console.log(isShowCodesChecked);
});

function addCodesToTable(codes, table) {
  codes.forEach((code) => {
    const row = document.createElement("tr");
    const symbol = document.createElement("td");
    const codeValue = document.createElement("td");
    symbol.innerHTML = code.char;
    codeValue.innerHTML = code.code;
    row.appendChild(symbol);
    row.appendChild(codeValue);
    table.appendChild(row);
  });
}
