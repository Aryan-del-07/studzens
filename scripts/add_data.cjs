const fs = require('fs');

const metadata = {
  'iit-delhi': { nirf: 2, year: 1961 },
  'aiims-delhi': { nirf: 1, year: 1956 },
  'lsr': { nirf: 9, year: 1956 },
  'srcc': { nirf: 11, year: 1926 },
  'nift-delhi': { nirf: 1, year: 1986 },
  'ashoka': { nirf: 90, year: 2014 },
  'iit-roorkee': { nirf: 5, year: 1847 },
  'bits-pilani': { nirf: 20, year: 1964 },
  'iit-bombay': { nirf: 3, year: 1958 },
  'nmims': { nirf: 47, year: 1981 },
  'fergusson': { nirf: 79, year: 1885 },
  'symbiosis-law': { nirf: 6, year: 1977 },
  'iisc': { nirf: 2, year: 1909 },
  'nlsiu': { nirf: 1, year: 1986 },
  'christ': { nirf: 60, year: 1969 },
  'mit-manipal': { nirf: 61, year: 1957 },
  'iit-madras': { nirf: 1, year: 1959 },
  'madras-medical': { nirf: 11, year: 1835 },
  'loyola': { nirf: 7, year: 1925 },
  'cmc-vellore': { nirf: 3, year: 1900 },
  'psg-tech': { nirf: 63, year: 1951 },
  'nalsar': { nirf: 3, year: 1998 },
  'uoh': { nirf: 17, year: 1974 },
  'osmania-medical': { nirf: 20, year: 1846 },
  'jadavpur': { nirf: 4, year: 1955 },
  'nid-ahmedabad': { nirf: 1, year: 1961 },
  'cept': { nirf: 15, year: 1962 },
  'aiims-bhubaneswar': { nirf: 17, year: 2012 },
  'nlu-odisha': { nirf: 22, year: 2008 },
  'iim-indore': { nirf: 8, year: 1996 }
};

let content = fs.readFileSync('src/data/colleges.ts', 'utf8');

for (const [id, data] of Object.entries(metadata)) {
  const regex = new RegExp(`(id:\\s*'${id}',\\s*name:\\s*'[^']+',)`, 'g');
  content = content.replace(regex, `$1\n    nirfRank: ${data.nirf},\n    establishedYear: ${data.year},`);
}

fs.writeFileSync('src/data/colleges.ts', content);
console.log('Updated colleges.ts');
