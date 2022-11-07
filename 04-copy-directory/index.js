const path = require('path');
const fs = require('fs');

copyDir(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));

function copyDir(original, copy) {

  fs.rm(copy, { force: true, recursive: true }, (error => { // Remove the folder recursively.
    if (error) console.log(error);

    fs.mkdir(copy, { recursive: true }, error => { // Creating a copy of the original folder.
      if (error) console.log(error);

      fs.readdir(original, (error, fileNames) => { // Reading the contents of the folder.
        if (error) console.log(error);

        for (const fileName of fileNames) { // Sorting out a contents of the folder.
          const currentName = path.join(original, fileName);

          fs.stat(currentName, (error, stats) => {
            if (error) console.log(error);

            if (stats.isFile()) { // Check that this is a folder or file.
              const copyFileName = path.join(copy, fileName);

              fs.copyFile(currentName, copyFileName, error => { if (error) console.log(error); }); // Copy if the file.

            } else {
              original = path.join(original, fileName);
              copy = path.join(copy, fileName);

              copyAssetsIntoProjectDist(original, copy); // Call of the recursion if the folder.

            }
          })
        }
      })
    })
  }));
}
