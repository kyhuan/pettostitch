# PetToStitch

[PetToStitch](https://pettostitch.cc) turns pet photos into editable, printable cross-stitch patterns. The converter runs entirely in the browser, so uploaded photos stay on the user's device.

## Features

- Convert a photo into a counted cross-stitch pattern
- Crop images and remove simple backgrounds before conversion
- Adjust stitch count, color count, contrast, saturation, and dithering
- Edit individual grid cells with undo and redo
- Download the preview or print a symbol chart with a thread legend
- Use the site in English, Spanish, German, or Simplified Chinese
- Use all core tools without an account

## Run locally

PetToStitch is a static site with no runtime dependencies.

```bash
python -m http.server 4173 --directory dist
```

Then open <http://localhost:4173>.

## Rebuild localized pages

The English page is the source template. After changing its structure, regenerate the localized entry pages with:

```bash
node scripts/build-locales.mjs
```

## Project structure

```text
dist/
  index.html          English entry page
  app.js              Converter and editor logic
  styles.css          Site styles
  i18n.js             Shared locale behavior
  es/ de/ zh-cn/      Localized entry pages
  assets/             Demo images
scripts/
  build-locales.mjs   Localized page generator
```

## Privacy

Image processing happens locally in the browser. PetToStitch does not upload source photos to a server.
