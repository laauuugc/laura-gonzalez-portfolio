# Laura Gonzalez — portfolio

Open `index.html` in a browser to view the site. No build step.

## Editing content
Almost everything lives in **`data.js`**:

- `SITE`: your name, email and social links (empty for now; add your profile URLs and they appear in the footer)
- `PROJECTS`: every client/personal project. Each one gets its own page automatically
  (`project.html?p=<slug>`). Change titles, years and descriptions here.
- `PAINTINGS`: the canvases on the Paintings page
- `FAVOURITES`: the favourite things on the About page
- `NETSOC_JOURNEY`: your Netsoc roles, shown on every project marked `netsoc: true`

The six pieces under “Recent pieces” on the home page are listed in `SELECTED` at the top of the home section in `script.js`.

## Adding images
1. Put the original file in `images/`.
2. Make a web-sized copy in `images/web/` (the originals are too big to load quickly).
   On a Mac (this also converts iPhone .heic photos, which most browsers can't show):
   `sips -s format jpeg -s formatOptions 80 -Z 1800 images/my-file.heic --out images/web/my-file.jpg`
   If the photo comes out sideways, add a rotation: `sips -r 270 images/web/my-file.jpg`
   Then make its small thumbnail, which cards and walls use so pages load fast:
   `sips -s format jpeg -s formatOptions 76 --resampleWidth 1000 images/web/my-file.jpg --out images/web/thumbs/my-file.jpg`
   If you forget the thumbnail, the site falls back to the full-size image; it just loads slower.
3. Reference `images/web/my-file.jpg` from `data.js`, with a short `alt` description.
   For personal pieces set `medium: 'Gouache'` or `'Digital'` (for the filter).

Paintings: add an entry to `PAINTINGS` in `data.js` and it appears on the Paintings page. The first painting is also the one framed on the home page.

The favourite-thing photos are in `images/favourites/` (640×640 square JPEGs; your full-size originals are in `images/originals/favourites/`). To swap one, replace the file with a new square image of the same name, or change `img` in `FAVOURITES`.

## Design system

- **Colours:** navy ink `#172251` on paper `#faf7f0`, with `#f1ebdf` for alternate sections. Defined at the top of `styles.css`.
- **Type:** Instrument Serif for headings, Instrument Sans for everything else.
- **Tile:** one azulejo pattern, `images/tiles/azulejo.svg`. Add the class `tiled` to any block to give it the tiled wall. It's used on purpose in only three places (home hero, shop and the footer band), so keep it rare.
