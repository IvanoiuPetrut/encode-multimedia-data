const { readFileAsBytes } = window.electronAPI.require(
  "../shared/fileOperations"
);

const fileContent = document.querySelector("#fileContent");
const fileInputEl = document.querySelector("#fileInput");

fileInputEl.addEventListener("change", async (event) => {
  const filePath = event.target.files[0].path;
  const file = await readFileAsBytes(filePath);
  console.log(file);
  // file.forEach((byte, index) => {
  //   fileContent.innerHTML += `Byte: <bold>${byte}</bold>; Index: <bold>${index}</bold> <br>`;
  // });
  // fileInput.value = fileBits.join("");
});
