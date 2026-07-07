const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

// 1. Lee el script original (legible) desde la carpeta 'src'
const sourceScriptPath = path.join(__dirname, 'src', 'script.js');
const originalScript = fs.readFileSync(sourceScriptPath, 'utf8');

// 2. Ofusca el código
const obfuscatedResult = JavaScriptObfuscator.obfuscate(originalScript, {
    compact: true,
    controlFlowFlattening: true,
});
const obfuscatedScript = obfuscatedResult.getCode();

// 3. Crea la carpeta 'dist' (donde irán los archivos finales)
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// 4. Escribe el script ofuscado en 'dist/script.js'
const outputScriptPath = path.join(distDir, 'script.js');
fs.writeFileSync(outputScriptPath, obfuscatedScript, 'utf8');

// 5. (Opcional) Copia tu HTML a la carpeta 'dist'
//    Reemplaza el enlace al script si es necesario
let htmlContent = fs.readFileSync(path.join(__dirname, 'src', 'index.html'), 'utf8');
// Asegúrate de que el HTML enlace al script ofuscado en 'dist/script.js'
htmlContent = htmlContent.replace('script.js', 'script.js'); // No hace nada, pero por si acaso
fs.writeFileSync(path.join(distDir, 'index.html'), htmlContent, 'utf8');

console.log('✅ ¡Código ofuscado y archivos generados en la carpeta "dist"!');
