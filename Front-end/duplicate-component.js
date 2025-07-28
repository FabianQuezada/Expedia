const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];       // ej: provider-profile
const newName = process.argv[3];             // ej: provider-profile-v2

if (!componentName || !newName) {
  console.error('❌ Uso: node duplicate-component.js [componente-original] [nuevo-componente]');
  process.exit(1);
}

const srcPath = path.join('src/app/components', componentName);
const destPath = path.join('src/app/components', newName);

if (!fs.existsSync(srcPath)) {
  console.error('❌ El componente original no existe.');
  process.exit(1);
}

fs.mkdirSync(destPath, { recursive: true });

fs.readdirSync(srcPath).forEach(file => {
  const newFileName = file.replace(componentName, newName);
  const content = fs.readFileSync(path.join(srcPath, file), 'utf-8')
    .replace(new RegExp(componentName, 'g'), newName)
    .replace(
      new RegExp(toClassName(componentName), 'g'),
      toClassName(newName)
    );

  fs.writeFileSync(path.join(destPath, newFileName), content);
});

console.log(`✅ Componente duplicado en: ${destPath}`);

function toClassName(name) {
  return name
    .split('-')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join('') + 'Component';
}
