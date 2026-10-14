# Laura Gonzalez — portfolio

Open `index.html` in a browser to view the site. No build step.

## Editing content
Almost everything lives in **`data.js`**:

- `SITE`: your name, email and social links (the social links still point to the sites' home pages, so add your profile URLs)
- `PROJECTS`: every client/personal project. Each one gets its own page automatically
  (`project.html?p=<slug>`). Change titles, years and descriptions here.
- `PAINTINGS`: the canvases on the Paintings page
- `FAVOURITES`: the cabinet on the About page
- `NETSOC_JOURNEY`: your Netsoc roles, shown on every project marked `netsoc: true`

The Madrid street-sign plaques, Spanish-deck suits and metro lines are set up in `script.js` (`PLAQUES`, `LINES`).

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
   For personal pieces set `medium: 'Gouache'` or `'Digital'` (for the filter), and `ratio`
   (image width ÷ height) so the wall can lay it out before it loads.

Paintings: add an entry to `PAINTINGS` in `data.js` and it is hung in the gallery automatically.

The favourite-object drawings are in `images/favourites/` (SVG). Swap in photos by changing `img` in `FAVOURITES`.
