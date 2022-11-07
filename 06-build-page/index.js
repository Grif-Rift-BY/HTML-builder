const fs = require('fs');
const path = require('path');

runHtmlBuilder();

async function runHtmlBuilder() {

  await createProjectDistDir('project-dist');
  await createStyleCssBundle('styles', 'project-dist', 'style.css');
  await createIndexHtmlBundle('components', 'project-dist', 'index.html', 'template.html');
  await copyAssetsIntoProjectDist(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist/assets'));

}

// Creating a folder for the built project.
function createProjectDistDir(folder) {
  const projectFolder = path.join(__dirname, folder);

  fs.rm(projectFolder, { force: true, recursive: true }, (error => { if (error) console.log(); }));
  fs.mkdir(projectFolder, { recursive: true }, error => { if (error) console.log(error); });

}

 // Creating and writing style.css to the project folder.
function createStyleCssBundle(sourceFolder, projectFolder, cssfileName) {
  const destinationCssFilePath = path.join(__dirname, projectFolder, cssfileName);
  const stylesFolder = path.join(__dirname, sourceFolder);

  fs.readdir(stylesFolder, (error, fileNames) => { // Reading the css files.
    if (error) console.log(error);

    fs.writeFile(destinationCssFilePath, '', error => { if (error) console.log(error); }); // Create output css file.

    for (const fileName of fileNames) { // Sorting out a contents of the folder.
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

 // Creating and writing index.html to the project folder.
function createIndexHtmlBundle(componentsFolder, projectFolder, htmlfileName, templateFileName) {
  let template = '';
  const templateFilePath = path.join(__dirname, templateFileName);
  const indexHtmlFilePath = path.join(__dirname, projectFolder, htmlfileName);
  const componentsDir = path.join(__dirname, componentsFolder);

  fs.readFile(templateFilePath, 'utf-8',(error, data) => { // Reading template file .
    if (error) console.log(error);
    template = data;
  })

  fs.readdir(componentsDir, (error, fileNames) => { // Reading the names of the component folder files.
    if (error) console.log(error);

    for (const fileName of fileNames) {
      const componentName = path.parse(fileName).name;
      const componentFilePath = path.join(componentsDir, fileName);

      fs.readFile(componentFilePath, (error, data) => { // Reading the component file.
        if (error) console.log(error);
        const component = data;

        template = template.replaceAll(`{{${ componentName }}}`, component); // Add template by component.
        fs.writeFile(indexHtmlFilePath, template, error => { if (error) console.log(error); }); // Rewrite output index.html file.

      })

    }
  })
}

// Copy resource files to the project folder.
function copyAssetsIntoProjectDist(original, copy) {

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

              copyAssetsIntoProjectDist(path.join(original, fileName), path.join(copy, fileName)); // Call of the recursion if the folder.

            }
          })
        }
      })
    })
  }));
}