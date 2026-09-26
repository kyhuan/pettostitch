import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const source = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const i18nSource = fs.readFileSync(path.join(dist, "i18n.js"), "utf8");

const locales = {
  es: {
    path: "es",
    url: "https://pettostitch.cc/es/",
    title: "Convertir foto en patrón de punto de cruz gratis | PetToStitch",
    description: "Convierte una foto de tu mascota en un patrón de punto de cruz editable con colores tipo DMC. Gratis, privado y sin registro.",
    social: "Convierte una foto de tu mascota en un patrón de punto de cruz editable, imprimible y gratuito."
  },
  de: {
    path: "de",
    url: "https://pettostitch.cc/de/",
    title: "Foto in Kreuzstichmuster umwandeln | PetToStitch",
    description: "Verwandle ein Haustierfoto kostenlos in eine bearbeitbare Kreuzstichvorlage mit DMC-ähnlichen Garnfarben. Privat und ohne Anmeldung.",
    social: "Erstelle kostenlos eine bearbeitbare und druckbare Kreuzstichvorlage aus deinem Haustierfoto."
  },
  "zh-CN": {
    path: "zh-cn",
    url: "https://pettostitch.cc/zh-cn/",
    title: "图片转十字绣图纸工具｜PetToStitch",
    description: "免费把宠物照片转换成可编辑、可打印的十字绣图纸，支持裁剪、去背景、DMC 风格色号和格子编辑，无需注册。",
    social: "免费把宠物照片转换成可编辑、可打印的十字绣图纸。"
  }
};

function dictionaryFor(locale) {
  const document = {
    documentElement: { lang: locale },
    body: {},
    createTreeWalker: () => ({ nextNode: () => false }),
    querySelectorAll: () => [],
    querySelector: () => null
  };
  const sandbox = { document, window: {}, NodeFilter: { SHOW_TEXT: 4 }, location: { hash: "", href: "" } };
  vm.runInNewContext(i18nSource, sandbox);
  return sandbox.window.pettoDictionary;
}

function replaceMeta(html, selector, value) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return html.replace(new RegExp(`(<meta ${escaped} content=")[^"]*(")`), `$1${value}$2`);
}

for (const [locale, config] of Object.entries(locales)) {
  let html = source.replace('<html lang="en">', `<html lang="${locale}">`);
  const dictionary = dictionaryFor(locale);
  for (const [english, translation] of Object.entries(dictionary)) html = html.split(english).join(translation);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${config.title}</title>`);
  html = replaceMeta(html, 'name="description"', config.description);
  html = replaceMeta(html, 'property="og:title"', config.title);
  html = replaceMeta(html, 'property="og:description"', config.social);
  html = replaceMeta(html, 'property="og:url"', config.url);
  html = replaceMeta(html, 'name="twitter:title"', config.title);
  html = replaceMeta(html, 'name="twitter:description"', config.social);
  html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${config.url}">`);
  html = html.replace('"url": "https://pettostitch.cc/"', `"url": "${config.url}"`);
  const directory = path.join(dist, config.path);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, "index.html"), html);
}

console.log(`Built ${Object.keys(locales).length} localized pages.`);
