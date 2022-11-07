const fsPromises = require('fs/promises');
const path = require('path');
const fs = require('fs');
(async () => {
  try {
    const fileNames = await fsPromises.readdir(path.join(__dirname, 'secret-folder')); console.log();
    for (const fileName of fileNames) {
      fs.stat(path.join(__dirname, 'secret-folder', fileName), (error, stats) => {
        if (error) console.log(error);
        if (stats.isFile()) {
          const fileExtension = path.parse(fileName).ext.slice(1);
          const fileSize = ( stats.size / 1024).toFixed(3);
          const name = path.parse(fileName).name;
          console.log(name + ' - ' + fileExtension + ' - ' + fileSize + '\x1b[32m' + ' kb' + '\x1b[0m');
        }
      });
    }
  } catch (error) { console.log(error); }
})();