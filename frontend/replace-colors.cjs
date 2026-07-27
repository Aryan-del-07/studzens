const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const replacements = [
  // Backgrounds
  { pattern: /bg-\[#635BFF\]/g, replacement: 'bg-black' },
  { pattern: /bg-\[#EEF0FF\]/g, replacement: 'bg-slate-100' },
  { pattern: /bg-\[#F0F2F8\]/g, replacement: 'bg-slate-50' },
  { pattern: /bg-indigo-500\/20/g, replacement: 'bg-slate-800' },
  { pattern: /bg-indigo-600\/10/g, replacement: 'bg-slate-800' },
  { pattern: /fill-\[#635BFF\]/g, replacement: 'fill-black' },
  
  // Text
  { pattern: /text-\[#635BFF\]/g, replacement: 'text-black' },
  { pattern: /text-\[#4F46E5\]/g, replacement: 'text-black' },
  { pattern: /text-blue-600/g, replacement: 'text-slate-800' },
  { pattern: /text-blue-700/g, replacement: 'text-slate-900' },
  { pattern: /text-blue-400/g, replacement: 'text-slate-300' },
  { pattern: /text-indigo-400/g, replacement: 'text-slate-300' },
  
  // Borders
  { pattern: /border-\[#C7C5FF\]/g, replacement: 'border-slate-300' },
  { pattern: /border-blue-500\/20/g, replacement: 'border-slate-700' },
  
  // Gradients
  { pattern: /from-\[#635BFF\]/g, replacement: 'from-black' },
  { pattern: /to-\[#4F46E5\]/g, replacement: 'to-slate-900' },
  { pattern: /to-\[#818CF8\]/g, replacement: 'to-slate-800' },
  { pattern: /from-blue-900\/40/g, replacement: 'from-slate-900\/40' },
  { pattern: /to-indigo-900\/40/g, replacement: 'to-slate-800\/40' },
  
  // Shadows & Rings
  { pattern: /shadow-\[#635BFF\]/g, replacement: 'shadow-black' },
  { pattern: /ring-\[#635BFF\]/g, replacement: 'ring-black' },
  { pattern: /shadow-\[#635BFF\]\/30/g, replacement: 'shadow-black/20' },
  { pattern: /shadow-blue-600\/20/g, replacement: 'shadow-black/20' }
];

let filesModified = 0;

walk(srcDir, function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    for (const r of replacements) {
      content = content.replace(r.pattern, r.replacement);
    }
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Modified: ' + filePath);
      filesModified++;
    }
  }
});

console.log('Done! Modified ' + filesModified + ' files.');
