const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const output = fs.createWriteStream(path.join(process.cwd(), 'market-mbti-maintenance.skill'));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', function() {
  console.log('✅ Skill packaged successfully: market-mbti-maintenance.skill (' + archive.pointer() + ' total bytes)');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);
archive.directory('market-mbti-maintenance/', false);
archive.finalize();
