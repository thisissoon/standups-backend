const fs             = require('fs');
const rimraf      = require('rimraf');

function getFileName(folderPath) {
  const fileNames = fs.readdirSync(folderPath, (err, filenames) => filenames);
  const fileName = fileNames[0];
  return fileName.split('.')[0];
}

function clearFolder(folderPath){
  return new Promise(resolve => {
    rimraf(folderPath, () => {
      if (!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath);
      }
      resolve();
    });
  });
}

module.exports = {
  getFileName: getFileName,
  clearFolder: clearFolder
};
