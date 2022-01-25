const program = require('commander')

const helpOptions = () => {
  program.option('-q, --qsvc', 'A  CLI of Quick Start Vue3')
  program.option('-d, --dest <dest>', 'Destination folder，eg: -d /src/components')
  // program.option('-f, --framework <framework>', 'Choose a framework，eg: vue、react')

  program.on('--help', function () {
    console.log('');
    console.log('Other:');
    console.log(' other options.');
  })
}

module.exports = helpOptions;