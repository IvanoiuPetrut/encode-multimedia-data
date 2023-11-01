const fs = require("fs").promises;

// create a vector of apparations of each byte from 0 to 255 and initialize every value to 0

async function readFileAsBytes(filePath) {
  const buffer = await fs.readFile(filePath, { encoding: null });
  console.log("Read file:", buffer);
  return buffer;
}

// * filePath, file, huffmanCodes
async function writeCodifiedFile(filePath, codes, file) {
  const codesJSON = JSON.stringify(codes);
  let fullCode = `<header>${codesJSON}</header>
  `;
  for (let i = 0; i < file.length; i++) {
    const code = codes[file[i]];
    fullCode += code;
  }
  fs.writeFile(filePath, fullCode, { encoding: null });
}

module.exports = {
  readFileAsBytes,
  writeCodifiedFile,
};
