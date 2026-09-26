const DMC = [
  ["B5200", "Snow White", 255, 255, 255], ["3865", "Winter White", 249, 247, 241], ["Ecru", "Ecru", 240, 234, 218], ["310", "Black", 19, 19, 22],
  ["3799", "Pewter Gray", 66, 66, 66], ["414", "Steel Gray", 140, 140, 140], ["762", "Pearl Gray", 236, 236, 236], ["3371", "Black Brown", 30, 17, 8],
  ["938", "Coffee Brown", 54, 31, 14], ["898", "Coffee Brown Dark", 73, 42, 19], ["801", "Coffee Brown Dark", 101, 57, 25], ["433", "Brown Medium", 122, 69, 31],
  ["434", "Brown Light", 152, 94, 51], ["435", "Brown Very Light", 184, 119, 72], ["436", "Tan", 203, 144, 81], ["437", "Tan Light", 228, 187, 142],
  ["739", "Tan Ultra Very Light", 248, 228, 200], ["3823", "Yellow Ultra Pale", 255, 253, 227], ["3853", "Autumn Gold Dark", 242, 151, 70], ["742", "Tangerine Light", 255, 191, 87],
  ["721", "Orange Spice Medium", 242, 120, 66], ["920", "Copper Medium", 172, 84, 48], ["918", "Red Copper Dark", 130, 52, 35], ["351", "Coral", 233, 106, 103],
  ["761", "Salmon Light", 255, 201, 201], ["3713", "Salmon Very Light", 255, 226, 226], ["815", "Garnet Medium", 135, 7, 31], ["304", "Christmas Red Medium", 183, 31, 51],
  ["326", "Rose Very Dark", 179, 59, 75], ["3687", "Mauve", 201, 107, 112], ["3727", "Antique Mauve Light", 219, 169, 178], ["154", "Grape Very Dark", 87, 36, 51],
  ["3834", "Grape Dark", 114, 55, 93], ["3835", "Grape Medium", 148, 96, 131], ["211", "Lavender Light", 227, 203, 227], ["939", "Navy Blue Very Dark", 27, 40, 83],
  ["823", "Navy Blue Dark", 33, 48, 99], ["797", "Royal Blue", 19, 71, 125], ["799", "Delft Blue Medium", 116, 142, 182], ["3753", "Antique Blue Ultra Very Light", 219, 226, 233],
  ["3846", "Turquoise Bright Light", 6, 227, 230], ["958", "Sea Green Dark", 62, 182, 161], ["3812", "Sea Green Very Dark", 47, 140, 132], ["500", "Blue Green Very Dark", 4, 77, 51],
  ["501", "Blue Green Dark", 57, 111, 82], ["503", "Blue Green Medium", 123, 172, 148], ["3813", "Blue Green Light", 178, 212, 189], ["890", "Pistachio Green Ultra Dark", 23, 73, 35],
  ["3345", "Hunter Green Dark", 27, 89, 21], ["3347", "Yellow Green Medium", 113, 147, 92], ["3364", "Pine Green", 131, 151, 95], ["772", "Yellow Green Very Light", 228, 236, 212],
  ["732", "Olive Green", 148, 140, 54], ["734", "Olive Green Light", 199, 192, 119], ["725", "Topaz Medium Light", 255, 200, 64], ["745", "Yellow Pale Light", 255, 233, 173],
  ["819", "Baby Pink Light", 255, 238, 235], ["948", "Peach Very Light", 254, 231, 218], ["3774", "Desert Sand Very Light", 243, 225, 215], ["950", "Desert Sand Light", 238, 211, 196]
].map(([code, name, r, g, b], index) => ({ code, name, r, g, b, index, hex: `rgb(${r},${g},${b})` }));

const symbols = ["●", "×", "■", "◆", "▲", "+", "○", "□", "◇", "△", "/", "\\", "=", "#", "★", "✦", "⊙", "⌁", "▣", "◈", "▴", "▾", "◐", "◑", "⊕", "⊗", "▧", "▨", "⌂", "♢"];
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const t = window.pettoT || ((text) => text);
const format = window.pettoFormat || ((key, value) => key === "stitches" ? `${value} stitches` : `${value} colors`);
const SETTINGS_KEY = "pettostitch-pattern-settings-v1";
const el = {
  file: $("#fileInput"), upload: $("#uploadButton"), sample: $("#sampleButton"), drop: $("#dropZone"), photoTools: $("#photoToolsButton"),
  heroUpload: $("#heroUploadButton"), heroSample: $("#heroSampleButton"),
  settings: $("#settingsPanel"), width: $("#gridWidth"), widthOut: $("#gridWidthOut"), colors: $("#colorCount"), colorsOut: $("#colorCountOut"),
  fabric: $("#fabricCount"), regen: $("#regenerateButton"), canvas: $("#patternCanvas"), frame: $("#canvasFrame"), empty: $("#emptyState"), busy: $("#busy"),
  result: $("#resultBar"), actions: $("#actions"), size: $("#patternSize"), finished: $("#finishedSize"), stitches: $("#stitchCount"), used: $("#colorsUsed"),
  palette: $("#paletteList"), paletteTotal: $("#paletteTotal"), download: $("#downloadButton"), print: $("#printButton"), toast: $("#toast"),
  editor: $("#editorToolbar"), editorHint: $("#editorHint"), selectedThread: $("#selectedThread"), undo: $("#undoButton"), redo: $("#redoButton"), dialog: $("#photoDialog"),
  prepCanvas: $("#prepCanvas"), zoom: $("#cropZoom"), zoomOut: $("#cropZoomOut"), tolerance: $("#bgTolerance"), toleranceOut: $("#bgToleranceOut"),
  brushSize: $("#brushSize"), brushSizeOut: $("#brushSizeOut"), closeDialog: $("#closePhotoDialog"), cancelDialog: $("#cancelPhotoButton"),
  resetPhoto: $("#resetPhotoButton"), applyPhoto: $("#applyPhotoButton")
};

const state = {
  sourceImage: null, image: null, imageName: "pattern", grid: null, allPalette: [], palette: [], view: "stitches", processing: false,
  editTool: "paint", selectedColor: null, undo: [], redo: [], drawing: false, strokeChanged: false, renderCell: 10,
  crop: { zoom: 1, offsetX: 0, offsetY: 0, tolerance: 0, maskTool: "move", brushSize: 32, manualMask: null, rendered: null }, cropPointer: null, entryPoint: "studio"
};

function track(name, props = {}) { if (typeof window.plausible === "function") window.plausible(name, { props }); }
function toast(message) { el.toast.textContent = message; el.toast.classList.add("show"); clearTimeout(toast.timer); toast.timer = setTimeout(() => el.toast.classList.remove("show"), 2200); }
function setBusy(on) { state.processing = on; el.busy.hidden = !on; el.regen.disabled = on; }
function updateLabels() { el.widthOut.value = format("stitches", el.width.value); el.colorsOut.value = format("colors", el.colors.value); }
function revealStudio() { $("#studio").scrollIntoView({ behavior: "smooth", block: "start" }); }
function saveSettings() { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify({ width: el.width.value, colors: el.colors.value, fabric: el.fabric.value })); } catch {} }
function restoreSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    if (saved?.width) el.width.value = saved.width;
    if (saved?.colors) el.colors.value = saved.colors;
    if (saved?.fabric) el.fabric.value = saved.fabric;
  } catch {}
}

function loadImage(src, name = "pattern") {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      state.sourceImage = image; state.image = image;
      state.imageName = name.replace(/\.[^.]+$/, "").replace(/[^a-z0-9-_]+/gi, "-") || "pattern";
      state.crop = { zoom: 1, offsetX: 0, offsetY: 0, tolerance: 0, maskTool: "move", brushSize: 32, manualMask: null, rendered: null };
      el.settings.classList.add("ready"); el.photoTools.disabled = false; resolve(image);
    };
    image.onerror = reject; image.src = src;
  });
}

async function useSample() { await loadImage("/assets/sample-cat.jpg", "maple-cat"); await generate(); }
async function useFile(file) {
  if (!file) return;
  if (file.size > 15 * 1024 * 1024) return toast(t("Please choose an image under 15 MB."));
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return toast(t("Please choose a JPG, PNG, or WebP image."));
  track("Photo selected", { source: state.entryPoint, format: file.type.replace("image/", "") });
  const url = URL.createObjectURL(file);
  try { await loadImage(url, file.name); await generate(); openPhotoDialog(); }
  catch { toast(t("We couldn’t read that image.")); }
  finally { URL.revokeObjectURL(url); }
}

function samplePixels(image, width, height) {
  const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const imageRatio = image.width / image.height, outputRatio = width / height;
  let sx = 0, sy = 0, sw = image.width, sh = image.height;
  if (imageRatio > outputRatio) { sw = image.height * outputRatio; sx = (image.width - sw) / 2; }
  else { sh = image.width / outputRatio; sy = (image.height - sh) / 2; }
  context.imageSmoothingEnabled = true; context.imageSmoothingQuality = "high";
  context.drawImage(image, sx, sy, sw, sh, 0, 0, width, height);
  return context.getImageData(0, 0, width, height).data;
}

function colorDistance(rgb, color) { const dr = rgb[0] - color.r, dg = rgb[1] - color.g, db = rgb[2] - color.b; return dr * dr * .3 + dg * dg * .59 + db * db * .11; }
function nearestColor(rgb, palette) { let best = palette[0], distance = Infinity; for (const color of palette) { const next = colorDistance(rgb, color); if (next < distance) { distance = next; best = color; } } return best; }
function choosePalette(data, count) {
  const buckets = new Map();
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 80) continue;
    const r = data[i] >> 4, g = data[i + 1] >> 4, b = data[i + 2] >> 4, key = (r << 8) | (g << 4) | b;
    const value = buckets.get(key) || { n: 0, r: 0, g: 0, b: 0 }; value.n++; value.r += data[i]; value.g += data[i + 1]; value.b += data[i + 2]; buckets.set(key, value);
  }
  const colors = [...buckets.values()].sort((a, b) => b.n - a.n).slice(0, Math.max(24, count * 4)).map((v) => [v.r / v.n, v.g / v.n, v.b / v.n]);
  const chosen = [];
  for (const rgb of colors) { const color = nearestColor(rgb, DMC); if (!chosen.includes(color)) chosen.push(color); if (chosen.length >= count) break; }
  if (!chosen.length) chosen.push(DMC[0]); return chosen;
}

function cleanGrid(grid, width, height) {
  const output = grid.slice();
  for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) {
    const index = y * width + x, current = grid[index]; if (current < 0) continue;
    const around = [grid[index - 1], grid[index + 1], grid[index - width], grid[index + width]].filter((v) => v >= 0);
    if (around.filter((v) => v === current).length === 0) {
      const counts = new Map(); around.forEach((v) => counts.set(v, (counts.get(v) || 0) + 1));
      const best = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]; if (best && best[1] >= 3) output[index] = best[0];
    }
  }
  return output;
}

async function generate() {
  if (!state.image || state.processing) return;
  setBusy(true); await new Promise((resolve) => setTimeout(resolve, 30));
  try {
    const width = Number(el.width.value), height = Math.max(24, Math.round(width * state.image.height / state.image.width));
    const data = samplePixels(state.image, width, height), palette = choosePalette(data, Number(el.colors.value));
    let cells = []; for (let i = 0; i < data.length; i += 4) cells.push(data[i + 3] < 80 ? -1 : palette.indexOf(nearestColor([data[i], data[i + 1], data[i + 2]], palette)));
    cells = cleanGrid(cells, width, height); state.grid = { w: width, h: height, cells }; state.allPalette = palette; state.undo = []; state.redo = [];
    recalculatePattern(); state.selectedColor = state.palette[0]?.index ?? 0; syncSelectedThread(); renderPalette(); saveSettings();
    el.empty.hidden = true; el.result.hidden = false; el.actions.hidden = false; el.editor.hidden = false; el.editorHint.hidden = false; el.frame.classList.add("editing");
    track("Pattern generated", { width, colors: state.palette.length, source: state.entryPoint });
  } catch (error) { console.error(error); toast(t("Pattern generation failed. Try a smaller photo.")); }
  finally { setBusy(false); }
}

function recalculatePattern() {
  if (!state.grid) return;
  const counts = Array(state.allPalette.length).fill(0); state.grid.cells.forEach((value) => { if (value >= 0) counts[value]++; });
  state.palette = state.allPalette.map((color, index) => ({ ...color, index, count: counts[index] })).filter((color) => color.count).sort((a, b) => b.count - a.count);
  render(); updateStats(); renderPalette(); syncHistoryButtons();
}

function render() {
  if (!state.image) return;
  const canvas = el.canvas, context = canvas.getContext("2d");
  if (state.view === "photo") {
    const max = 760, ratio = state.image.width / state.image.height; canvas.width = ratio >= 1 ? max : Math.round(max * ratio); canvas.height = ratio >= 1 ? Math.round(max / ratio) : max;
    context.clearRect(0, 0, canvas.width, canvas.height); context.drawImage(state.image, 0, 0, canvas.width, canvas.height); el.frame.classList.remove("editing"); return;
  }
  if (!state.grid) return;
  const { w, h, cells } = state.grid, cell = Math.max(7, Math.min(15, Math.floor(720 / Math.max(w, h)))); state.renderCell = cell;
  canvas.width = w * cell + 1; canvas.height = h * cell + 1; context.fillStyle = "#fff"; context.fillRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const colorIndex = cells[y * w + x]; if (colorIndex < 0) continue; const color = state.allPalette[colorIndex], px = x * cell, py = y * cell;
    if (state.view === "symbols") {
      context.fillStyle = "#fff"; context.fillRect(px, py, cell, cell); context.fillStyle = "#173330"; context.font = `700 ${Math.max(6, cell - 3)}px Arial`;
      context.textAlign = "center"; context.textBaseline = "middle"; context.fillText(symbols[colorIndex % symbols.length], px + cell / 2, py + cell / 2 + .5);
    } else {
      context.fillStyle = color.hex; context.fillRect(px, py, cell, cell); context.strokeStyle = contrast(color) > 145 ? "rgba(23,51,48,.64)" : "rgba(255,255,255,.7)";
      context.lineWidth = Math.max(1, cell * .11); context.beginPath(); context.moveTo(px + 2, py + 2); context.lineTo(px + cell - 2, py + cell - 2); context.moveTo(px + cell - 2, py + 2); context.lineTo(px + 2, py + cell - 2); context.stroke();
    }
  }
  context.lineWidth = 1;
  for (let x = 0; x <= w; x++) { context.strokeStyle = x % 10 === 0 ? "rgba(23,51,48,.75)" : "rgba(23,51,48,.16)"; context.beginPath(); context.moveTo(x * cell + .5, 0); context.lineTo(x * cell + .5, h * cell); context.stroke(); }
  for (let y = 0; y <= h; y++) { context.strokeStyle = y % 10 === 0 ? "rgba(23,51,48,.75)" : "rgba(23,51,48,.16)"; context.beginPath(); context.moveTo(0, y * cell + .5); context.lineTo(w * cell, y * cell + .5); context.stroke(); }
  el.frame.classList.add("editing");
}

function contrast(color) { return color.r * .299 + color.g * .587 + color.b * .114; }
function updateStats() {
  const { w, h, cells } = state.grid, count = cells.filter((value) => value >= 0).length, inch = w / Number(el.fabric.value), inchH = h / Number(el.fabric.value);
  el.size.textContent = `${w} × ${h}`; el.finished.textContent = `${(inch * 2.54).toFixed(1)} × ${(inchH * 2.54).toFixed(1)} cm`; el.stitches.textContent = count.toLocaleString(); el.used.textContent = state.palette.length;
}

function renderPalette() {
  el.paletteTotal.textContent = format("paletteColors", state.palette.length);
  el.palette.innerHTML = state.palette.map((color) => `<button class="swatch-row ${state.selectedColor === color.index ? "selected" : ""}" type="button" data-color-index="${color.index}" aria-label="Paint with ${color.code} ${color.name}"><span class="swatch" style="background:${color.hex}"></span><span class="swatch-info"><strong>${symbols[color.index % symbols.length]} · ${color.code}</strong><span>${color.name}</span></span><span class="swatch-count">${color.count.toLocaleString()}</span></button>`).join("");
  $$("[data-color-index]").forEach((button) => button.addEventListener("click", () => selectThread(Number(button.dataset.colorIndex))));
}

function selectThread(index) { state.selectedColor = index; state.editTool = "paint"; syncEditorTools(); syncSelectedThread(); renderPalette(); }
function syncSelectedThread() {
  const color = state.allPalette[state.selectedColor], swatch = el.selectedThread.querySelector("span"), label = el.selectedThread.querySelector("strong");
  if (!color) { swatch.removeAttribute("style"); label.textContent = t("Select a thread"); return; } swatch.style.background = color.hex; label.textContent = `${color.code} · ${color.name}`;
}
function syncEditorTools() { $$(".editor-tool").forEach((button) => { const active = button.dataset.tool === state.editTool; button.classList.toggle("active", active); button.setAttribute("aria-pressed", String(active)); }); }
function syncHistoryButtons() { el.undo.disabled = !state.undo.length; el.redo.disabled = !state.redo.length; }
function pushUndo() { state.undo.push(state.grid.cells.slice()); if (state.undo.length > 30) state.undo.shift(); state.redo = []; syncHistoryButtons(); }
function undo() { if (!state.undo.length) return; state.redo.push(state.grid.cells.slice()); state.grid.cells = state.undo.pop(); recalculatePattern(); }
function redo() { if (!state.redo.length) return; state.undo.push(state.grid.cells.slice()); state.grid.cells = state.redo.pop(); recalculatePattern(); }

function canvasCell(event) {
  const rect = el.canvas.getBoundingClientRect(), x = Math.floor(((event.clientX - rect.left) * el.canvas.width / rect.width) / state.renderCell), y = Math.floor(((event.clientY - rect.top) * el.canvas.height / rect.height) / state.renderCell);
  if (!state.grid || x < 0 || y < 0 || x >= state.grid.w || y >= state.grid.h) return null; return { index: y * state.grid.w + x };
}
function editCell(event) {
  if (!state.grid || state.view === "photo") return; const cell = canvasCell(event); if (!cell) return;
  const next = state.editTool === "erase" ? -1 : state.selectedColor; if (next == null || state.grid.cells[cell.index] === next) return;
  state.grid.cells[cell.index] = next; state.strokeChanged = true; render();
}
function startGridEdit(event) {
  if (!state.grid || state.view === "photo" || event.button !== 0) return; event.preventDefault(); pushUndo(); state.drawing = true; state.strokeChanged = false; el.canvas.setPointerCapture(event.pointerId); editCell(event);
}
function finishGridEdit() { if (!state.drawing) return; state.drawing = false; if (!state.strokeChanged) state.undo.pop(); recalculatePattern(); }

function download() {
  if (!state.grid) return;
  const previousView = state.view;
  setView("stitches");
  const link = document.createElement("a");
  link.download = `${state.imageName}-cross-stitch-${state.grid.w}x${state.grid.h}.png`;
  link.href = el.canvas.toDataURL("image/png");
  link.click();
  if (previousView !== "stitches") setView(previousView);
  track("Chart downloaded", { width: state.grid.w, colors: state.palette.length });
  toast(t("Color stitch chart downloaded."));
}
function setView(view) { state.view = view; $$(".tab").forEach((tab) => { const active = tab.dataset.view === view; tab.classList.toggle("active", active); tab.setAttribute("aria-selected", String(active)); }); render(); }

function openPhotoDialog() { if (!state.sourceImage) return; syncCropControls(); ensureCropMask(); renderCrop(); el.dialog.showModal(); }
function ensureCropMask(reset = false) { const size = 560; if (reset || !state.crop.manualMask || state.crop.manualMask.length !== size * size) state.crop.manualMask = new Int8Array(size * size); }
function resetCrop() { state.crop = { zoom: 1, offsetX: 0, offsetY: 0, tolerance: 0, maskTool: "move", brushSize: 32, manualMask: new Int8Array(560 * 560), rendered: null }; syncCropControls(); syncMaskTools(); renderCrop(); }
function syncCropControls() {
  el.zoom.value = String(Math.round(state.crop.zoom * 100)); el.tolerance.value = String(state.crop.tolerance); el.brushSize.value = String(state.crop.brushSize);
  el.zoomOut.value = `${Math.round(state.crop.zoom * 100)}%`; el.toleranceOut.value = state.crop.tolerance ? `${state.crop.tolerance}` : t("Off"); el.brushSizeOut.value = `${state.crop.brushSize} px`;
}
function syncMaskTools() { $$(".mask-tool").forEach((button) => { const active = button.dataset.maskTool === state.crop.maskTool; button.classList.toggle("active", active); button.setAttribute("aria-pressed", String(active)); }); el.prepCanvas.classList.toggle("brush-active", state.crop.maskTool !== "move"); }

function rawCropImage() {
  const size = 560, canvas = document.createElement("canvas"); canvas.width = canvas.height = size;
  const context = canvas.getContext("2d", { willReadFrequently: true }), image = state.sourceImage, baseScale = Math.max(size / image.width, size / image.height) * state.crop.zoom;
  const width = image.width * baseScale, height = image.height * baseScale; context.imageSmoothingEnabled = true; context.imageSmoothingQuality = "high";
  context.drawImage(image, (size - width) / 2 + state.crop.offsetX, (size - height) / 2 + state.crop.offsetY, width, height); return context.getImageData(0, 0, size, size);
}

function automaticBackgroundMask(imageData, tolerance) {
  const size = imageData.width, data = imageData.data, mask = new Uint8Array(size * size); if (!tolerance) return mask;
  let rr = 0, gg = 0, bb = 0, samples = 0;
  const sample = (x, y) => { const i = (y * size + x) * 4; if (data[i + 3] > 20) { rr += data[i]; gg += data[i + 1]; bb += data[i + 2]; samples++; } };
  for (let i = 0; i < 24; i++) { sample(i, 0); sample(size - 1 - i, 0); sample(i, size - 1); sample(size - 1 - i, size - 1); sample(0, i); sample(0, size - 1 - i); sample(size - 1, i); sample(size - 1, size - 1 - i); }
  if (!samples) return mask; const ref = [rr / samples, gg / samples, bb / samples], threshold = tolerance * tolerance * 2.35, queue = new Int32Array(size * size); let head = 0, tail = 0;
  const add = (x, y) => { const p = y * size + x; if (mask[p]) return; const i = p * 4, dr = data[i] - ref[0], dg = data[i + 1] - ref[1], db = data[i + 2] - ref[2]; if (data[i + 3] < 20 || dr * dr * .3 + dg * dg * .59 + db * db * .11 <= threshold) { mask[p] = 1; queue[tail++] = p; } };
  for (let i = 0; i < size; i++) { add(i, 0); add(i, size - 1); add(0, i); add(size - 1, i); }
  while (head < tail) { const p = queue[head++], x = p % size, y = (p / size) | 0; if (x > 0) add(x - 1, y); if (x < size - 1) add(x + 1, y); if (y > 0) add(x, y - 1); if (y < size - 1) add(x, y + 1); }
  return mask;
}

function renderCrop() {
  if (!state.sourceImage) return; const imageData = rawCropImage(), autoMask = automaticBackgroundMask(imageData, state.crop.tolerance);
  for (let p = 0; p < state.crop.manualMask.length; p++) { const manual = state.crop.manualMask[p]; if (manual === -1 || (autoMask[p] && manual !== 1)) imageData.data[p * 4 + 3] = 0; }
  el.prepCanvas.width = el.prepCanvas.height = 560; el.prepCanvas.getContext("2d").putImageData(imageData, 0, 0); state.crop.rendered = imageData;
}
function cropPoint(event) { const rect = el.prepCanvas.getBoundingClientRect(); return { x: Math.max(0, Math.min(559, (event.clientX - rect.left) * 560 / rect.width)), y: Math.max(0, Math.min(559, (event.clientY - rect.top) * 560 / rect.height)) }; }
function paintMask(event) {
  const point = cropPoint(event), radius = state.crop.brushSize / 2, value = state.crop.maskTool === "erase" ? -1 : 1;
  const minX = Math.max(0, Math.floor(point.x - radius)), maxX = Math.min(559, Math.ceil(point.x + radius)), minY = Math.max(0, Math.floor(point.y - radius)), maxY = Math.min(559, Math.ceil(point.y + radius));
  for (let y = minY; y <= maxY; y++) for (let x = minX; x <= maxX; x++) if ((x - point.x) ** 2 + (y - point.y) ** 2 <= radius ** 2) state.crop.manualMask[y * 560 + x] = value; renderCrop();
}
function startCropPointer(event) {
  if (event.button !== 0) return; event.preventDefault(); el.prepCanvas.setPointerCapture(event.pointerId); const point = cropPoint(event); state.cropPointer = { ...point, startX: state.crop.offsetX, startY: state.crop.offsetY }; if (state.crop.maskTool !== "move") paintMask(event);
}
function moveCropPointer(event) {
  if (!state.cropPointer) return;
  if (state.crop.maskTool === "move") { const point = cropPoint(event); state.crop.offsetX = state.cropPointer.startX + point.x - state.cropPointer.x; state.crop.offsetY = state.cropPointer.startY + point.y - state.cropPointer.y; state.crop.manualMask.fill(0); renderCrop(); }
  else paintMask(event);
}
function finishCropPointer() { state.cropPointer = null; }
async function applyCrop() {
  const image = new Image(), loaded = new Promise((resolve, reject) => { image.onload = resolve; image.onerror = reject; }); image.src = el.prepCanvas.toDataURL("image/png"); await loaded;
  state.image = image; el.dialog.close(); await generate(); track("Photo prepared", { backgroundRemoval: state.crop.tolerance > 0 ? "on" : "off" }); toast(t(state.crop.tolerance ? "Crop and background applied." : "Crop applied."));
}

el.heroUpload.addEventListener("click", () => { state.entryPoint = "hero"; track("Photo picker opened", { source: "hero" }); el.file.click(); });
el.heroSample.addEventListener("click", async () => { state.entryPoint = "hero"; track("Sample tried", { source: "hero" }); await useSample(); revealStudio(); });
el.upload.addEventListener("click", () => { state.entryPoint = "studio"; track("Photo picker opened", { source: "studio" }); el.file.click(); }); el.file.addEventListener("change", async (event) => { const file = event.target.files[0]; await useFile(file); event.target.value = ""; }); el.sample.addEventListener("click", async () => { state.entryPoint = "studio"; track("Sample tried", { source: "studio" }); await useSample(); }); el.photoTools.addEventListener("click", openPhotoDialog);
el.regen.addEventListener("click", generate); el.download.addEventListener("click", download); el.print.addEventListener("click", () => { track("Pattern printed", { width: state.grid?.w || 0, colors: state.palette.length }); setView("symbols"); setTimeout(() => window.print(), 100); });
el.fabric.addEventListener("change", () => { saveSettings(); if (state.grid) updateStats(); }); el.width.addEventListener("input", () => { updateLabels(); saveSettings(); }); el.colors.addEventListener("input", () => { updateLabels(); saveSettings(); }); el.undo.addEventListener("click", undo); el.redo.addEventListener("click", redo);
el.canvas.addEventListener("pointerdown", startGridEdit); el.canvas.addEventListener("pointermove", (event) => state.drawing && editCell(event)); el.canvas.addEventListener("pointerup", finishGridEdit); el.canvas.addEventListener("pointercancel", finishGridEdit);
$$('.editor-tool').forEach((button) => button.addEventListener("click", () => { state.editTool = button.dataset.tool; syncEditorTools(); })); $$('.tab').forEach((tab) => tab.addEventListener("click", () => setView(tab.dataset.view)));
$$('.jump-to-studio').forEach((button) => button.addEventListener("click", () => { $("#studio").scrollIntoView({ behavior: "smooth" }); setTimeout(() => el.upload.focus(), 500); }));
["dragenter", "dragover"].forEach((name) => el.drop.addEventListener(name, (event) => { event.preventDefault(); el.drop.classList.add("dragging"); })); ["dragleave", "drop"].forEach((name) => el.drop.addEventListener(name, (event) => { event.preventDefault(); el.drop.classList.remove("dragging"); })); el.drop.addEventListener("drop", (event) => useFile(event.dataTransfer.files[0]));
el.closeDialog.addEventListener("click", () => el.dialog.close()); el.cancelDialog.addEventListener("click", () => el.dialog.close()); el.resetPhoto.addEventListener("click", resetCrop); el.applyPhoto.addEventListener("click", applyCrop);
el.zoom.addEventListener("input", () => { state.crop.zoom = Number(el.zoom.value) / 100; state.crop.manualMask.fill(0); syncCropControls(); renderCrop(); }); el.tolerance.addEventListener("input", () => { state.crop.tolerance = Number(el.tolerance.value); syncCropControls(); renderCrop(); });
el.brushSize.addEventListener("input", () => { state.crop.brushSize = Number(el.brushSize.value); syncCropControls(); }); $$('.mask-tool').forEach((button) => button.addEventListener("click", () => { state.crop.maskTool = button.dataset.maskTool; syncMaskTools(); }));
el.prepCanvas.addEventListener("pointerdown", startCropPointer); el.prepCanvas.addEventListener("pointermove", moveCropPointer); el.prepCanvas.addEventListener("pointerup", finishCropPointer); el.prepCanvas.addEventListener("pointercancel", finishCropPointer); el.dialog.addEventListener("close", () => { finishCropPointer(); if (state.entryPoint === "hero") revealStudio(); });
restoreSettings(); updateLabels(); syncEditorTools(); syncMaskTools();

if (document.modelContext?.registerTool) {
  const lifecycle = new AbortController();
  Promise.resolve(document.modelContext.registerTool({
    name: "configure_pet_cross_stitch_pattern", title: "Configure pet cross-stitch pattern", description: "Load the built-in pet photo and set the visible cross-stitch pattern width, color count, and fabric count.",
    inputSchema: { type: "object", properties: { width: { type: "integer", minimum: 30, maximum: 100 }, colors: { type: "integer", minimum: 6, maximum: 30 }, fabricCount: { type: "integer", enum: [11, 14, 16, 18] } }, additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false },
    async execute(input) { if (input.width !== undefined) el.width.value = Math.round(input.width / 5) * 5; if (input.colors !== undefined) el.colors.value = Math.round(input.colors / 2) * 2; if (input.fabricCount !== undefined) el.fabric.value = String(input.fabricCount); updateLabels(); if (!state.image) await loadImage("/assets/sample-cat.jpg", "maple-cat"); await generate(); return { status: "ready", width: Number(el.width.value), height: state.grid.h, colors: state.palette.length, fabricCount: Number(el.fabric.value) }; }
  }, { signal: lifecycle.signal })).catch(() => {});
}
