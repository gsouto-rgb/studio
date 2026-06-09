/* ================================================= */
/* CONFIGURAÇÃO */
/* ================================================= */

const DOWNLOAD_PASSWORD = "0";
const PROJECT_NAME = "Creative_HTML5";

const FORMATS = [
  "120x600",
  "160x600",
  "300x600",
  "300x250",
  "300x100",
  "320x100",
  "320x50",
  "728x90",
  "970x250",
  "980x90"
];

/* ================================================= */
/* BOTÃO */
/* ================================================= */

const downloadBtn =
document.getElementById("download-btn");

/* ================================================= */
/* CLICK PRINCIPAL */
/* ================================================= */

downloadBtn.addEventListener("click", async () => {

  const password = prompt("Digite a senha para exportar:");

  if (password !== DOWNLOAD_PASSWORD) {
    alert("Senha incorreta");
    return;
  }

  await createMasterZip();
});

/* ================================================= */
/* MASTER ZIP (1 arquivo com todos os formatos) */
/* ================================================= */

async function createMasterZip() {

  console.log("Iniciando exportação MASTER ZIP...");

  const zip = new JSZip();

  for (const format of FORMATS) {

    console.log(`Adicionando formato: ${format}`);

    const width = format.split("x")[0];
    const height = format.split("x")[1];

    /* ========================================= */
    /* PASTA DO FORMATO */
    /* ========================================= */

    const folder = zip.folder(format);
    const assets = folder.folder("assets");

    /* ========================================= */
    /* HTML */
    /* ========================================= */

    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="ad.size" content="width=${width},height=${height}">
<title>${PROJECT_NAME}</title>
<link rel="stylesheet" href="style.css">
</head>

<body>

<a id="click-area">

  <div class="creative-container"
       style="width:${width}px;height:${height}px">

      <div class="prod"></div>
      <div class="copy"></div>
      <div class="logo"></div>
      <div class="cta"></div>

  </div>

</a>

<script>
var clickTag = "https://www.soutoad.com";
</script>

<script src="script.js"></script>

</body>
</html>
`.trim();

    folder.file("index.html", html);

    /* ========================================= */
    /* CSS (compartilhado) */
    /* ========================================= */

    const cssResponse = await fetch("./banner.css");
    const cssContent = await cssResponse.text();

    folder.file("style.css", cssContent);

    /* ========================================= */
    /* SCRIPT (dinâmico por formato) */
    /* ========================================= */

    const js = `
const creative =
document.querySelector(".creative-container");

const format = "${format}";

document.getElementById("click-area")
.addEventListener("click", () => {
  window.open(clickTag, "_blank");
});

creative.querySelector(".logo").style.backgroundImage =
\`url('./assets/\${format}logo.png')\`;

creative.querySelector(".copy").style.backgroundImage =
\`url('./assets/\${format}copy.png')\`;

creative.querySelector(".prod").style.backgroundImage =
\`url('./assets/\${format}img.png')\`;

creative.querySelector(".cta").style.backgroundImage =
\`url('./assets/\${format}cta.png')\`;
`.trim();

    folder.file("script.js", js);

    /* ========================================= */
    /* ASSETS */
    /* ========================================= */

    const files = [
      `${format}logo.png`,
      `${format}copy.png`,
      `${format}img.png`,
      `${format}cta.png`
    ];

    for (const fileName of files) {

      try {

        const response = await fetch(`./assets/${fileName}`);

        if (!response.ok) {
          console.warn(`Asset não encontrado: ${fileName}`);
          continue;
        }

        const blob = await response.blob();
        assets.file(fileName, blob);

      } catch (err) {
        console.error(`Erro ao carregar asset: ${fileName}`, err);
      }
    }
  }

  /* ================================================= */
  /* DOWNLOAD FINAL */
  /* ================================================= */

  const blob = await zip.generateAsync({ type: "blob" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${PROJECT_NAME}_ALL_FORMATS.zip`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  console.log("Exportação concluída com sucesso!");
}