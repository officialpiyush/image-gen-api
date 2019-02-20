/* eslint-disable */
const chalk = require('chalk');
const glob = require('glob');
const fs = require('fs');
const prettier = require('prettier');
const prettierConfigPath = require.resolve('../../../.prettierrc');

const mode = process.argv[2] || 'check';
const shouldWrite = mode === 'write' || mode === 'write-changed';

let didWarn = false;
let didError = false;

const files = glob.sync('**/*.js', {
  ignore: '**/node_modules/**',
});

if (!files.length) return null;

files.forEach(file => {
  const options = prettier.resolveConfig.sync(file, {
    config: prettierConfigPath,
  });
  try {
    const input = fs.readFileSync(file, 'utf8');
    if (shouldWrite) {
      const output = prettier.format(input, options);
      if (output !== input) {
        fs.writeFileSync(file, output, 'utf8');
      }
    } else {
      if (!prettier.check(input, options)) {
        if (!didWarn) {
          console.log(
            '\n' +
              chalk.red(
                `  This project uses prettier to format all JavaScript code.\n`
              ) +
              chalk.dim(`    Please run `) +
              chalk.reset('yarn prettier-all') +
              chalk.dim(
                ` and add changes to files listed below to your commit:`
              ) +
              `\n\n`
          );
          didWarn = true;
        }
        console.log(file);
      }
    }
  } catch (error) {
    didError = true;
    console.log('\n\n' + error.message);
    console.log(file);
  }
});

if (didWarn || didError) {
  process.exit(1);
}
