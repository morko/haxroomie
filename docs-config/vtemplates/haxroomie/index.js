const fs = require('jsdoc/fs');
const path = require('path');
const { Template } = require('jsdoc/template');

const tmpl = new Template(path.join(__dirname, 'tmpl'));
tmpl.layout = path.join(tmpl.path, 'layout.tmpl');
const staticDir = path.join(__dirname, 'static');

function publish(outDir, data) {
  let html = tmpl.render('versions.tmpl', data);
  let outputFile = path.join(outDir, 'index.html')
  fs.writeFileSync(outputFile, html, 'utf8');
  copyAllFiles(staticDir, outDir)
}

function copyAllFiles(fromDir, toDir) {
  let files = fs.ls(fromDir, 3);

  files.forEach(fileName => {
    const outputDir = fs.toDir( fileName.replace(fromDir, toDir) );
    fs.mkPath(outputDir);
    fs.copyFileSync(fileName, outputDir);
  });
}

module.exports = {
  publish
};