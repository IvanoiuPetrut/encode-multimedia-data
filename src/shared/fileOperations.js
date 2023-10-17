const fs = require("fs").promises;

// create a vector of apparations of each byte from 0 to 255 and initialize every value to 0

async function readFileAsBytes(filePath) {
  const buffer = await fs.readFile(filePath, { encoding: null });
  return buffer;
}

function writeFile(filePath, content, callback) {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

// * filePath, file, huffmanCodes
async function writeCodifiedFile(filePath, huffmanCodes) {
  const huffmanCodesJSON = JSON.stringify(huffmanCodes);
  let fullCode = `<header>${huffmanCodesJSON}</header>
  `;
  for (let i = 0; i < file.length; i++) {
    const code = huffmanCodes[file[i]];
    fullCode += code;
  }
  fs.writeFile(filePath, fullCode, { encoding: null });
}

module.exports = {
  readFileAsBytes,
  writeFile,
  writeCodifiedFile,
};
