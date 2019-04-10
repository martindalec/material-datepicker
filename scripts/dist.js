const cpx = require('cpx');
const fs = require('fs');
const fse = require('fs-extra');

cpx.copy('LICENSE', './dist');
cpx.copy('README.md', './dist');
cpx.copy('CHANGELOG.md', './dist');

fse.copy('./datepicker/src/lib/prebuilt-themes', './dist/themes', function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('success!');
  }
});

let packageJson = JSON.parse(
  fs.readFileSync('package.json', {
    encoding: 'utf8'
  })
);
const version = packageJson['version'];

// datepicker
packageJson = JSON.parse(fs.readFileSync('./dist/package.json'));
packageJson['version'] = version;

fs.writeFileSync('./dist/package.json', JSON.stringify(packageJson, undefined, 2));
