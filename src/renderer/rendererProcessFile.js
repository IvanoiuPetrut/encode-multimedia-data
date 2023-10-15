const { readFile, writeFile, readOneBit, readNBits, writeOneBit } =
  window.electronAPI.require("../shared/fileOperations");

const output = document.getElementById("output");

document.getElementById("readButton").addEventListener("click", async () => {
  // readOneBit("C:\\Personal\\input.txt")
  //   .then((bit) => {
  //     console.log("Read bit:", bit);
  //   })
  //   .catch((err) => {
  //     console.error("Error:", err);
  //   });

  readNBits("C:\\Personal\\1900b0aE.dag", 12)
    .then((bits) => {
      console.log("Read bits:", bits);
    })
    .catch((err) => {
      console.error("Error:", err);
    });
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

function readText(file, offset, callback) {
  const reader = new FileReader();
  const blob = file.slice(offset);
  reader.onload = function (e) {
    callback(e.target.result);
  };
  reader.readAsText(blob);
}
