const fs = require('fs');
const path = require('path');
(() => {
  const writeStream = fs.createWriteStream(path.join(__dirname, 'output-text.txt'), 'utf-8');
  console.log('\n\x1b[32m' + 'ENTER PASSWORD >>>>>' + '\x1b[0m');
  process.stdin.on('data', data => {
    if (data.toString().trim() !== 'exit') writeStream.write(data);
    else {
      console.log('\x1b[31m' + '>>>>> ROCKETS LAUNCHED');
      process.exit();
    }
  });
    process.on('SIGINT', () => {
    console.log('\x1b[31m' + '>>>>> ROCKETS LAUNCHED');
    process.exit();
  });
})();