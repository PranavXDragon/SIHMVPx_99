const fs = require('fs');
const path = require('path');
const https = require('https');

const logosDir = path.join(__dirname, '../public/images/logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

const logos = [
  { id: 'iocl', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Indian_Oil_Logo.svg/320px-Indian_Oil_Logo.svg.png' },
  { id: 'bpcl', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bharat_Petroleum_Logo.svg/320px-Bharat_Petroleum_Logo.svg.png' },
  { id: 'hpcl', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Hindustan_Petroleum_Logo.svg/320px-Hindustan_Petroleum_Logo.svg.png' },
  { id: 'ongc', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/ONGC_Logo.svg/320px-ONGC_Logo.svg.png' },
  { id: 'cpcl', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Chennai_Petroleum_Corporation_Limited_Logo.png/320px-Chennai_Petroleum_Corporation_Limited_Logo.png' },
  { id: 'sail', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Steel_Authority_of_India_Limited_Logo.svg/320px-Steel_Authority_of_India_Limited_Logo.svg.png' },
  { id: 'mrpl', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Mangalore_Refinery_and_Petrochemicals_Limited_logo.png/320px-Mangalore_Refinery_and_Petrochemicals_Limited_logo.png' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const item of logos) {
    const dest = path.join(logosDir, `${item.id}.png`);
    try {
      await download(item.url, dest);
      console.log(`Downloaded ${item.id}`);
    } catch (e) {
      console.error(`Failed ${item.id}:`, e.message);
    }
  }
}

run();
