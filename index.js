import fetch from 'node-fetch';
import fs from 'node:fs';
import https from 'node:https';

const test = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);

const final = await test.text();

let m;
const urls = [],
  str = final,
  rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

while ((m = rex.exec(str))) {
  urls.push(m[1]);
}

const dir = './memes';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

for (let i = 0; i < 10; i++) {
  const url = urls[i];
  https.get(url, (res) => {
    const path = `memes/0${i + 1}.jpg`;
    const writeStream = fs.createWriteStream(path);

    res.pipe(writeStream);

    writeStream.on('finish', () => {
      writeStream.close();
      console.log('Download Completed');
    });
  });
}
