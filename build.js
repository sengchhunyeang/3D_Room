// Builds the site into dist/: the page, plus web-size copies of the photos in Image/.
// The page reads dist/Image/list.json to know which photos to hang in the frames.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = path.join(__dirname, 'Image');
const OUT = path.join(__dirname, 'dist');
const OUT_IMG = path.join(OUT, 'Image');

(async () => {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT_IMG, { recursive: true });
  fs.copyFileSync(path.join(__dirname, 'pink-room-3d.html'), path.join(OUT, 'index.html'));

  const files = fs.existsSync(SRC)
    ? fs.readdirSync(SRC).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()
    : [];
  const list = [];
  for (const f of files) {
    const name = path.parse(f).name + '.jpg';
    await sharp(path.join(SRC, f))
      .rotate()
      .resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toFile(path.join(OUT_IMG, name));
    list.push(name);
  }
  fs.writeFileSync(path.join(OUT_IMG, 'list.json'), JSON.stringify(list));
  console.log('Built dist/ with ' + list.length + ' photo(s): ' + list.join(', '));
})().catch((e) => { console.error(e); process.exit(1); });
