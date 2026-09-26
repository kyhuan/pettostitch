(() => {
  const locale = document.documentElement.lang || "en";
  const paths = { en: "/", es: "/es/", de: "/de/", "zh-CN": "/zh-cn/" };
  const dictionaries = {
    es: {
      "How it works": "Cómo funciona", "FAQ": "Preguntas", "Start creating": "Empezar", "Your pet, one stitch at a time": "Tu mascota, puntada a puntada",
      "Turn a favorite photo into a pattern you’ll want to stitch.": "Convierte tu foto favorita en un patrón que querrás bordar.",
      "Choose the size and thread count, compare the result, then download a clear chart. Your photo is processed in this browser.": "Elige el tamaño y el número de colores, compara el resultado y descarga un gráfico claro. La foto se procesa en este navegador.",
      "Free to create": "Creación gratuita", "No account": "Sin cuenta", "Photo stays on your device": "La foto permanece en tu dispositivo", "Turn your photo into a pattern": "Convierte tu foto en un patrón", "Try Maple first": "Probar primero con Maple",
      "Original photo · Maple": "Foto original · Maple", "Pattern-ready": "Patrón listo", "60 × 60 · 18 colors": "60 × 60 · 18 colores",
      "Pattern studio": "Editor de patrones", "Make your first chart": "Crea tu primer gráfico", "Nothing is uploaded. Processing happens locally.": "No se sube nada. El procesamiento es local.",
      "Drop a pet photo here": "Suelta aquí una foto de tu mascota", "JPG, PNG or WebP · up to 15 MB": "JPG, PNG o WebP · hasta 15 MB", "Choose a photo": "Elegir una foto", "or try Maple": "o prueba con Maple",
      "Crop & remove background": "Recortar y quitar el fondo", "Frame the face and clear distractions": "Encuadra la cara y elimina distracciones", "Pattern width": "Ancho del patrón", "Small": "Pequeño", "Detailed": "Detallado",
      "Thread colors": "Colores de hilo", "Simpler": "Más simple", "Richer": "Más rico", "Fabric count": "Cuenta de la tela", "Update pattern": "Actualizar patrón",
      "Stitch preview": "Vista de puntadas", "Prepared photo": "Foto preparada", "Symbol chart": "Gráfico de símbolos", "Paint": "Pintar", "Erase": "Borrar", "Select a thread": "Elige un hilo",
      "Select a thread color, then paint or erase directly on the grid.": "Elige un color de hilo y pinta o borra directamente en la cuadrícula.", "Your pattern will appear here": "Tu patrón aparecerá aquí", "Use a close, well-lit photo with your pet filling most of the frame.": "Usa una foto cercana y bien iluminada en la que tu mascota ocupe casi todo el encuadre.",
      "Building your pattern…": "Creando tu patrón…", "Pattern": "Patrón", "Finished size": "Tamaño final", "Full stitches": "Puntadas completas", "Colors used": "Colores usados", "Download chart": "Descargar gráfico", "Print pattern": "Imprimir patrón",
      "Materials": "Materiales", "Thread palette": "Paleta de hilos", "Generate a pattern to see its thread colors and stitch counts.": "Genera un patrón para ver los colores de hilo y el número de puntadas.",
      "A calmer way to start": "Una forma sencilla de empezar", "From camera roll to first stitch": "De la foto a la primera puntada", "Choose a clear photo": "Elige una foto clara", "Close portraits with simple backgrounds preserve the features that make your pet recognizable.": "Los retratos cercanos con fondos sencillos conservan los rasgos que hacen reconocible a tu mascota.",
      "Shape the project": "Define el proyecto", "Adjust the stitch width and number of colors until the detail and workload feel right.": "Ajusta el ancho y el número de colores hasta conseguir el detalle y el trabajo adecuados.", "Take the chart with you": "Lleva el gráfico contigo", "Download a color chart or print a symbol version with the thread list beside you.": "Descarga un gráfico en color o imprime una versión con símbolos y la lista de hilos.",
      "Before you begin": "Antes de empezar", "A few useful answers": "Algunas respuestas útiles", "Does my photo leave my device?": "¿Mi foto sale de mi dispositivo?", "No. This first version processes the image entirely inside your browser. Closing the tab clears the working image.": "No. La imagen se procesa por completo en tu navegador. Al cerrar la pestaña se elimina la imagen de trabajo.",
      "Are the thread colors exact?": "¿Son exactos los colores de hilo?", "The chart uses a practical starter palette with familiar DMC-style references. Screen colors vary, so compare the listed skeins in person before buying a large quantity.": "El gráfico utiliza una paleta práctica con referencias tipo DMC. Los colores de pantalla varían; compara los hilos en persona antes de comprar una gran cantidad.",
      "What photo works best?": "¿Qué foto funciona mejor?", "Use a sharp, evenly lit image where the eyes are visible and your pet fills most of the frame. Busy backgrounds consume stitches without helping the portrait.": "Usa una imagen nítida y bien iluminada, con los ojos visibles y la mascota ocupando casi todo el encuadre. Los fondos recargados añaden puntadas sin mejorar el retrato.",
      "Is this already the paid version?": "¿Esta es la versión de pago?", "No. Pattern creation and export are free during the prototype stage while we improve the quality with real stitchers.": "No. La creación y exportación son gratuitas durante esta etapa mientras mejoramos la calidad con bordadores reales.",
      "Photo prep": "Preparar foto", "Frame your pet": "Encuadra a tu mascota", "Drag the photo to reposition it. Use the brushes to refine the background.": "Arrastra la foto para colocarla. Usa los pinceles para retocar el fondo.", "Zoom": "Zoom", "Background removal": "Quitar fondo", "Off": "Desactivado",
      "Raise this slowly. It removes similar colors connected to the photo edges.": "Súbelo poco a poco. Elimina colores similares conectados a los bordes.", "Refine mask": "Retocar máscara", "Move": "Mover", "Restore": "Restaurar", "Brush size": "Tamaño del pincel", "Tip": "Consejo",
      "Simple, evenly lit backgrounds work best. Restore around whiskers, ears, and fur if the automatic removal goes too far.": "Los fondos sencillos y uniformes funcionan mejor. Restaura bigotes, orejas y pelo si el borrado automático elimina demasiado.", "Reset": "Restablecer", "Cancel": "Cancelar", "Use this photo": "Usar esta foto", "Made for the pets we keep close.": "Creado para las mascotas que llevamos cerca.",
      "Please choose an image under 15 MB.": "Elige una imagen de menos de 15 MB.", "Please choose a JPG, PNG, or WebP image.": "Elige una imagen JPG, PNG o WebP.", "We couldn’t read that image.": "No pudimos leer esa imagen.", "Pattern generation failed. Try a smaller photo.": "No se pudo generar el patrón. Prueba con una foto más pequeña.", "Color stitch chart downloaded.": "Gráfico de puntadas en color descargado.", "Crop and background applied.": "Recorte y fondo aplicados.", "Crop applied.": "Recorte aplicado."
    },
    de: {
      "How it works": "So funktioniert’s", "FAQ": "FAQ", "Start creating": "Jetzt starten", "Your pet, one stitch at a time": "Dein Haustier, Stich für Stich",
      "Turn a favorite photo into a pattern you’ll want to stitch.": "Verwandle dein Lieblingsfoto in ein Stickmuster, das du gern sticken wirst.",
      "Choose the size and thread count, compare the result, then download a clear chart. Your photo is processed in this browser.": "Wähle Größe und Farbanzahl, prüfe das Ergebnis und lade eine klare Vorlage herunter. Dein Foto wird in diesem Browser verarbeitet.",
      "Free to create": "Kostenlos erstellen", "No account": "Kein Konto", "Photo stays on your device": "Foto bleibt auf deinem Gerät", "Turn your photo into a pattern": "Foto in ein Muster verwandeln", "Try Maple first": "Zuerst Maple testen",
      "Original photo · Maple": "Originalfoto · Maple", "Pattern-ready": "Stickfertig", "60 × 60 · 18 colors": "60 × 60 · 18 Farben",
      "Pattern studio": "Musterstudio", "Make your first chart": "Erstelle deine erste Vorlage", "Nothing is uploaded. Processing happens locally.": "Es wird nichts hochgeladen. Die Verarbeitung erfolgt lokal.",
      "Drop a pet photo here": "Haustierfoto hier ablegen", "JPG, PNG or WebP · up to 15 MB": "JPG, PNG oder WebP · bis 15 MB", "Choose a photo": "Foto auswählen", "or try Maple": "oder Maple ausprobieren",
      "Crop & remove background": "Zuschneiden & Hintergrund entfernen", "Frame the face and clear distractions": "Gesicht ausrichten und Ablenkungen entfernen", "Pattern width": "Musterbreite", "Small": "Klein", "Detailed": "Detailliert",
      "Thread colors": "Garnfarben", "Simpler": "Einfacher", "Richer": "Farbreicher", "Fabric count": "Stoffdichte", "Update pattern": "Muster aktualisieren",
      "Stitch preview": "Stichvorschau", "Prepared photo": "Bearbeitetes Foto", "Symbol chart": "Symbolvorlage", "Paint": "Malen", "Erase": "Löschen", "Select a thread": "Garn auswählen",
      "Select a thread color, then paint or erase directly on the grid.": "Wähle eine Garnfarbe und male oder lösche direkt im Raster.", "Your pattern will appear here": "Dein Muster erscheint hier", "Use a close, well-lit photo with your pet filling most of the frame.": "Verwende ein nahes, gut beleuchtetes Foto, auf dem dein Haustier den größten Teil des Bildes ausfüllt.",
      "Building your pattern…": "Muster wird erstellt…", "Pattern": "Muster", "Finished size": "Endgröße", "Full stitches": "Kreuzstiche", "Colors used": "Verwendete Farben", "Download chart": "Vorlage herunterladen", "Print pattern": "Muster drucken",
      "Materials": "Material", "Thread palette": "Garnpalette", "Generate a pattern to see its thread colors and stitch counts.": "Erstelle ein Muster, um Garnfarben und Stichzahlen zu sehen.",
      "A calmer way to start": "Ein einfacher Einstieg", "From camera roll to first stitch": "Vom Foto zum ersten Stich", "Choose a clear photo": "Klares Foto auswählen", "Close portraits with simple backgrounds preserve the features that make your pet recognizable.": "Nahaufnahmen mit schlichtem Hintergrund bewahren die typischen Merkmale deines Haustiers.",
      "Shape the project": "Projekt gestalten", "Adjust the stitch width and number of colors until the detail and workload feel right.": "Passe Breite und Farbanzahl an, bis Detailgrad und Aufwand stimmen.", "Take the chart with you": "Vorlage mitnehmen", "Download a color chart or print a symbol version with the thread list beside you.": "Lade eine Farbvorlage herunter oder drucke eine Symbolversion mit Garnliste.",
      "Before you begin": "Bevor du beginnst", "A few useful answers": "Einige hilfreiche Antworten", "Does my photo leave my device?": "Verlässt mein Foto mein Gerät?", "No. This first version processes the image entirely inside your browser. Closing the tab clears the working image.": "Nein. Das Bild wird vollständig in deinem Browser verarbeitet. Beim Schließen des Tabs wird das Arbeitsbild gelöscht.",
      "Are the thread colors exact?": "Sind die Garnfarben exakt?", "The chart uses a practical starter palette with familiar DMC-style references. Screen colors vary, so compare the listed skeins in person before buying a large quantity.": "Die Vorlage nutzt eine praktische Palette mit bekannten DMC-ähnlichen Referenzen. Bildschirmfarben können abweichen; vergleiche das Garn vor einem größeren Kauf.",
      "What photo works best?": "Welches Foto eignet sich am besten?", "Use a sharp, evenly lit image where the eyes are visible and your pet fills most of the frame. Busy backgrounds consume stitches without helping the portrait.": "Nutze ein scharfes, gleichmäßig beleuchtetes Bild mit sichtbaren Augen. Unruhige Hintergründe erhöhen die Stichzahl, ohne das Porträt zu verbessern.",
      "Is this already the paid version?": "Ist das schon die kostenpflichtige Version?", "No. Pattern creation and export are free during the prototype stage while we improve the quality with real stitchers.": "Nein. Erstellung und Export sind in der Prototypphase kostenlos, während wir die Qualität mit echten Stickerinnen und Stickern verbessern.",
      "Photo prep": "Foto vorbereiten", "Frame your pet": "Haustier ausrichten", "Drag the photo to reposition it. Use the brushes to refine the background.": "Ziehe das Foto zum Ausrichten. Verfeinere den Hintergrund mit den Pinseln.", "Zoom": "Zoom", "Background removal": "Hintergrund entfernen", "Off": "Aus",
      "Raise this slowly. It removes similar colors connected to the photo edges.": "Langsam erhöhen. Ähnliche Farben am Bildrand werden entfernt.", "Refine mask": "Maske verfeinern", "Move": "Verschieben", "Restore": "Wiederherstellen", "Brush size": "Pinselgröße", "Tip": "Tipp",
      "Simple, evenly lit backgrounds work best. Restore around whiskers, ears, and fur if the automatic removal goes too far.": "Schlichte, gleichmäßig beleuchtete Hintergründe funktionieren am besten. Stelle Schnurrhaare, Ohren und Fell wieder her, wenn zu viel entfernt wurde.", "Reset": "Zurücksetzen", "Cancel": "Abbrechen", "Use this photo": "Dieses Foto verwenden", "Made for the pets we keep close.": "Für die Haustiere, die uns nahestehen.",
      "Please choose an image under 15 MB.": "Bitte wähle ein Bild unter 15 MB.", "Please choose a JPG, PNG, or WebP image.": "Bitte wähle ein JPG-, PNG- oder WebP-Bild.", "We couldn’t read that image.": "Das Bild konnte nicht gelesen werden.", "Pattern generation failed. Try a smaller photo.": "Das Muster konnte nicht erstellt werden. Versuche ein kleineres Foto.", "Color stitch chart downloaded.": "Farbige Stickvorlage heruntergeladen.", "Crop and background applied.": "Zuschnitt und Hintergrund wurden angewendet.", "Crop applied.": "Zuschnitt angewendet."
    },
    "zh-CN": {
      "How it works": "使用方法", "FAQ": "常见问题", "Start creating": "开始制作", "Your pet, one stitch at a time": "一针一线，绣出你的爱宠",
      "Turn a favorite photo into a pattern you’ll want to stitch.": "把喜欢的宠物照片，变成真正想绣的十字绣图纸。",
      "Choose the size and thread count, compare the result, then download a clear chart. Your photo is processed in this browser.": "调整图纸尺寸和线色数量，预览效果，然后下载清晰图纸。照片只在当前浏览器中处理。",
      "Free to create": "免费制作", "No account": "无需注册", "Photo stays on your device": "照片不会离开设备", "Turn your photo into a pattern": "把照片转成十字绣图纸", "Try Maple first": "先试试 Maple 示例",
      "Original photo · Maple": "原始照片 · Maple", "Pattern-ready": "图纸预览", "60 × 60 · 18 colors": "60 × 60 · 18 种颜色",
      "Pattern studio": "图纸工作台", "Make your first chart": "制作你的第一张图纸", "Nothing is uploaded. Processing happens locally.": "无需上传，所有处理均在本地完成。",
      "Drop a pet photo here": "把宠物照片拖到这里", "JPG, PNG or WebP · up to 15 MB": "支持 JPG、PNG、WebP · 最大 15 MB", "Choose a photo": "选择照片", "or try Maple": "或使用 Maple 示例",
      "Crop & remove background": "裁剪与去背景", "Frame the face and clear distractions": "突出宠物主体，移除杂乱背景", "Pattern width": "图纸宽度", "Small": "更小", "Detailed": "更精细",
      "Thread colors": "绣线颜色", "Simpler": "更简单", "Richer": "更丰富", "Fabric count": "绣布规格", "Update pattern": "更新图纸",
      "Stitch preview": "十字绣预览", "Prepared photo": "处理后照片", "Symbol chart": "符号图纸", "Paint": "涂色", "Erase": "擦除", "Select a thread": "选择绣线",
      "Select a thread color, then paint or erase directly on the grid.": "选择一种绣线颜色，然后直接在格子上涂色或擦除。", "Your pattern will appear here": "图纸会显示在这里", "Use a close, well-lit photo with your pet filling most of the frame.": "建议使用清晰、光线均匀、宠物主体占比较大的照片。",
      "Building your pattern…": "正在生成图纸…", "Pattern": "图纸尺寸", "Finished size": "成品尺寸", "Full stitches": "总针数", "Colors used": "使用颜色", "Download chart": "下载图纸", "Print pattern": "打印图纸",
      "Materials": "材料", "Thread palette": "绣线色板", "Generate a pattern to see its thread colors and stitch counts.": "生成图纸后可查看绣线颜色和对应针数。",
      "A calmer way to start": "轻松开始", "From camera roll to first stitch": "从相册到第一针", "Choose a clear photo": "选择清晰照片", "Close portraits with simple backgrounds preserve the features that make your pet recognizable.": "主体突出、背景简单的近景照片，更能保留宠物最有辨识度的特征。",
      "Shape the project": "调整图纸", "Adjust the stitch width and number of colors until the detail and workload feel right.": "调整针数和颜色数量，在细节与制作难度之间取得平衡。", "Take the chart with you": "导出图纸", "Download a color chart or print a symbol version with the thread list beside you.": "下载彩色图纸，或打印带有绣线清单的符号图纸。",
      "Before you begin": "开始之前", "A few useful answers": "你可能想了解这些", "Does my photo leave my device?": "照片会上传到服务器吗？", "No. This first version processes the image entirely inside your browser. Closing the tab clears the working image.": "不会。图片完全在浏览器中处理，关闭页面后当前工作图片会被清除。",
      "Are the thread colors exact?": "绣线颜色准确吗？", "The chart uses a practical starter palette with familiar DMC-style references. Screen colors vary, so compare the listed skeins in person before buying a large quantity.": "图纸使用实用的 DMC 风格色号。不同屏幕存在色差，大量购买前建议先对照实体绣线。",
      "What photo works best?": "什么样的照片效果最好？", "Use a sharp, evenly lit image where the eyes are visible and your pet fills most of the frame. Busy backgrounds consume stitches without helping the portrait.": "选择清晰、光线均匀、眼睛可见且主体占比较大的照片。复杂背景会增加针数，但通常无助于突出宠物。",
      "Is this already the paid version?": "现在收费吗？", "No. Pattern creation and export are free during the prototype stage while we improve the quality with real stitchers.": "暂不收费。产品测试阶段可以免费生成和导出图纸，我们会根据真实绣友反馈继续改进。",
      "Photo prep": "照片处理", "Frame your pet": "调整宠物位置", "Drag the photo to reposition it. Use the brushes to refine the background.": "拖动照片调整位置，并使用画笔细化背景。", "Zoom": "缩放", "Background removal": "背景移除", "Off": "关闭",
      "Raise this slowly. It removes similar colors connected to the photo edges.": "逐步提高强度，它会移除与照片边缘相连的相似颜色。", "Refine mask": "细化蒙版", "Move": "移动", "Restore": "恢复", "Brush size": "画笔大小", "Tip": "提示",
      "Simple, evenly lit backgrounds work best. Restore around whiskers, ears, and fur if the automatic removal goes too far.": "简单、光线均匀的背景效果最好。如果自动去除过多，可以在胡须、耳朵和毛发附近使用恢复画笔。", "Reset": "重置", "Cancel": "取消", "Use this photo": "使用这张照片", "Made for the pets we keep close.": "为陪伴在身边的宠物而做。",
      "Please choose an image under 15 MB.": "请选择小于 15 MB 的图片。", "Please choose a JPG, PNG, or WebP image.": "请选择 JPG、PNG 或 WebP 图片。", "We couldn’t read that image.": "无法读取这张图片。", "Pattern generation failed. Try a smaller photo.": "图纸生成失败，请尝试尺寸更小的照片。", "Color stitch chart downloaded.": "彩色十字绣图纸已下载。", "Crop and background applied.": "裁剪和去背景已应用。", "Crop applied.": "裁剪已应用。"
    }
  };

  const dictionary = dictionaries[locale] || {};
  window.pettoDictionary = dictionary;
  const translate = (text) => dictionary[text] || text;
  window.pettoT = translate;
  window.pettoFormat = (key, value) => {
    const templates = {
      stitches: { en: `${value} stitches`, es: `${value} puntadas`, de: `${value} Stiche`, "zh-CN": `${value} 针` },
      colors: { en: `${value} colors`, es: `${value} colores`, de: `${value} Farben`, "zh-CN": `${value} 种颜色` },
      paletteColors: { en: `${value} colors`, es: `${value} colores`, de: `${value} Farben`, "zh-CN": `${value} 种颜色` }
    };
    return templates[key]?.[locale] || templates[key]?.en || String(value);
  };

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const original = node.nodeValue;
    const trimmed = original.trim();
    if (!trimmed || !dictionary[trimmed]) return;
    node.nodeValue = original.replace(trimmed, dictionary[trimmed]);
  });
  document.querySelectorAll("[aria-label],[alt]").forEach((element) => {
    ["aria-label", "alt"].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (value && dictionary[value]) element.setAttribute(attribute, dictionary[value]);
    });
  });

  const selector = document.querySelector("#languageSelector");
  if (selector) {
    selector.value = paths[locale] ? locale : "en";
    selector.addEventListener("change", () => {
      const next = paths[selector.value] || "/";
      location.href = `${next}${location.hash}`;
    });
  }
})();
