const path = require('path');
const fs = require('fs');
const sourceFilePath = path.join(__dirname, 'text.txt');
(async () => {
  const readableStream = await fs.createReadStream(sourceFilePath, 'utf-8');
  const { stdout } = process;
  let data = ''
  readableStream.on('data', chunck => data += chunck);
  readableStream.on('end', () => stdout.write(data + '\n'));
  readableStream.on('error', () => console.log('FILE NOT FOUND'));
})();