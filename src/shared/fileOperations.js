const fs = require("fs").promises;

async function readFileAsBytes(filePath) {
  const buffer = await fs.readFile(filePath, { encoding: null });
  return buffer;
}

module.exports = {
  readFileAsBytes,
};
