const path = require('path');
const fs = require('fs');

createCssBundle('styles', 'project-dist', 'bundle.css');
function createCssBundle(sourceFolder, projectFolder, cssfileName) {
  const destinationCssFilePath = path.join(__dirname, projectFolder, cssfileName);
  const stylesFolder = path.join(__dirname, sourceFolder);

  fs.readdir(stylesFolder, (error, fileNames) => { // Reading the css files.
    if (error) console.log(error);

    fs.writeFile(destinationCssFilePath, '', error => { if (error) console.log(error); }); // Create output css file.

    for (const fileName of fileNames) { // Sorting out a contents of the styles folder.
      const fileExtension = path.parse(fileName).ext;

      if (fileExtension === '.css') { //Check that this is a css file.
        fs.readFile(path.join(stylesFolder, fileName), (error, data) => { // Read current css file.
          if (error) console.log(error);
          fs.appendFile(destinationCssFilePath, data, error => { if (error) console.log(error); }); // Add output css file by current css file.
        })
      }

    }
  })
}