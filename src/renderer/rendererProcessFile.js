const { readFile, writeFile } = window.electronAPI.require(
  "../shared/fileOperations"
);

document.getElementById("readButton").addEventListener("click", () => {
  readFile("input.txt", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    document.getElementById("output").innerText = `File content: \n${data}`;
  });
});

document.getElementById("writeButton").addEventListener("click", () => {
  const contentToWrite = "This is the content to write to the file.";
  writeFile("output.txt", contentToWrite, (err) => {
    if (err) {
      console.error("Error writing to the file:", err);
      return;
    }
    console.log("File has been written successfully.");
  });
});
