const fs = require('fs');
const content = fs.readFileSync('src/data/colleges.ts', 'utf8');
const matches = [...content.matchAll(/id:\s*'([^']+)',\s*name:\s*'([^']+)'/g)];
const data = matches.map(m => ({ id: m[1], name: m[2] }));
console.log(JSON.stringify(data, null, 2));
