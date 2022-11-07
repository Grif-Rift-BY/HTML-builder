const path = require('path');
const fs = require('fs');
(() => {
  fs.readFile(path.join(__dirname,'text.txt'), 'utf-8', (error, data) => {
    if (error) console.log(error);
    process.stdout.write('\n' + data);
  })
})();