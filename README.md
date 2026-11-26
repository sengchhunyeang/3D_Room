# 3D_Room

Interactive 3D view of a pink room, built with three.js in a single HTML file (`pink-room-3d.html`).

- Outside, back, inside, ceiling and top views, with 360 spin
- Click the door, curtains, window panes and wardrobe doors to open them; click the fan to switch it
- Size labels, size list and an editable price list (riel)
- Preview colors for walls, pillars and beams; dark and light mode
- English and Khmer

## Photo frames

The frames on the wall above the computer show the photos in the `Image/` folder (`.jpg`, `.png`, `.webp`).
Up to 4 photos are shown, in file-name order. To change them, add or remove files in `Image/` and push.

The build (`node build.js`) makes web-size copies in `dist/Image/` and writes `dist/Image/list.json`.

## Run locally

```
npm install
npm run build
npx serve dist
```

Opening `pink-room-3d.html` directly also works, but the frames stay empty.

Pushes to `main` deploy to Vercel.
