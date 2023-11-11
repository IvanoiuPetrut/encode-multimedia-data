const { readFileAsBytes } = window.electronAPI.require(
  "../shared/fileOperations"
);

const { createFileStatistic, writeStatisticsToFile, getFileStatistic } =
  window.electronAPI.require("../shared/fileStatistics");

const { shannonFanoCoding, writeShanonFile, decodeShannonFile } =
  window.electronAPI.require("../shared/shannonFano");

const { clearBitReader } = window.electronAPI.require(
  "../shared/bitOperations/bitReader"
);

const selectedFile = document.querySelector(".selected-file"),
  encryptButton = document.querySelector("#encryptButton"),
  decryptButton = document.querySelector("#decryptButton"),
  fileInput = document.querySelector("#fileInput"),
  fileInputEncoded = document.querySelector("#fileInputEncoded"),
  showCodesCheckbox = document.querySelector("#showCodes"),
  codesTable = document.querySelector("#codesTable"),
  textForEncrypt = document.querySelector("#textForEncrypt");

let filePath = "";
let fileName = null;
let fileExtension = null;
let directoryPath = null;
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

    const codes = shannonFanoCoding(fileStatistic);
    if (isShowCodesChecked) {
      addCodesToTable(codes, codesTable);
    }

    if (fileName && fileExtension && directoryPath) {
      await writeStatisticsToFile(
        `${directoryPath}\\${fileName}.${fileExtension}.sf`,
        fileStatistic
      );
      await writeShanonFile(
        bytes,
        `${directoryPath}\\${fileName}.${fileExtension}.sf`,
        codes
      );
    } else {
      const currentDate = getCurrentDate();
      await writeStatisticsToFile(`D:\\${currentDate}.sf`, fileStatistic);
      await writeShanonFile(bytes, `D:\\${currentDate}.sf`, codes);
    }
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
    const fileStatistic = await getFileStatistic(bytes);

    const codes = shannonFanoCoding(fileStatistic);
    if (isShowCodesChecked) {
      addCodesToTable(codes, codesTable);
    }

    const date = getCurrentDate();
    if (fileName && fileExtension && directoryPath) {
      await decodeShannonFile(
        bytes,
        `${directoryPath}\\${fileName}.${fileExtension}.sf.${date}.${fileExtension}`,
        codes
      );
    }
  } catch (err) {
    console.error("Error:", err);
  }
});

fileInput.addEventListener("change", (event) => {
  filePath = event.target.files[0].path;
  selectedFile.innerHTML = filePath;
  [fileName, fileExtension] = getFileNameAndExtension(filePath);
  directoryPath = getDirectoryPath(filePath);
});

fileInputEncoded.addEventListener("change", (event) => {
  filePath = event.target.files[0].path;
  selectedFile.innerHTML = filePath;
  [fileName, fileExtension] = getFileNameAndExtension(filePath);
  directoryPath = getDirectoryPath(filePath);
});

showCodesCheckbox.addEventListener("change", (event) => {
  isShowCodesChecked = event.target.checked;
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

function getFileNameAndExtension(filePath) {
  const fullFileName = filePath
    .split("\\")
    [filePath.split("\\").length - 1].split(".");
  const fileName = fullFileName.shift();
  const fileExtension = fullFileName.shift();
  return [fileName, fileExtension];
}

function getDirectoryPath(filePath) {
  const directoryPath = filePath.substring(0, filePath.lastIndexOf("\\"));
  return directoryPath;
}

function getCurrentDate() {
  const date = new Date();
  const currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
  return currentDate;
}
