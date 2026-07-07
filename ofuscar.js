const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

// Ruta del archivo fuente
const sourceFile = path.join(__dirname, 'src', 'index.html');
// Ruta de salida (Vercel servirá esta carpeta)
const outputDir = path.join(__dirname, 'dist');
const outputFile = path.join(outputDir, 'index.html');

// Leer el HTML original
let html = fs.readFileSync(sourceFile, 'utf8');

// Extraer el contenido del primer <script> (puedes ajustar la lógica)
const scriptRegex = /<script>([\s\S]*?)<\/script>/;
const match = html.match(scriptRegex);

if (match) {
  const originalScript = match[1];
  
  // Ofuscar el código JavaScript
  const obfuscated = JavaScriptObfuscator.obfuscate(originalScript, {
    compact: true,
    controlFlowFlattening: true,
    // Ajusta opciones según tu necesidad
  }).getCode();

  // Reemplazar el script original por el ofuscado
  const newHtml = html.replace(scriptRegex, `<script>${obfuscated}</script>`);

  // Crear carpeta dist si no existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Escribir el nuevo HTML en dist/
  fs.writeFileSync(outputFile, newHtml, 'utf8');
  console.log('✅ Archivo ofuscado generado en dist/index.html');
} else {
  console.error('❌ No se encontró ningún <script> en el HTML');
  process.exit(1);
}
