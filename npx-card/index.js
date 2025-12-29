#!/usr/bin/env node

import boxen from 'boxen';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import gradient from 'gradient-string';
import ora from 'ora';

// Themes
const titleGradient = gradient(['#a855f7', '#ec4899']); // Purple to Pink for title

// Data
const data = {
  name: chalk.bold.white('Soumabrata Ghosh'),
  handle: chalk.cyan('Souma061'),
  title: chalk.hex('#c4b5fd')('Fullstack Developer'),
  fact: chalk.gray('btw its awesome'),
  website: chalk.cyan('https://soumabrata.me'),
  github: chalk.cyan('https://github.com/Souma061'),

  // Skills
  languages: chalk.white('JavaScript, C, Dart'),
  frameworks: chalk.white('React, ') + chalk.hex('#8d79ba').bold('Node.js') + chalk.white(', Express, MongoDB'),
  tools: chalk.white('Git, VS Code, Postman')
};

// Utils
const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const runFakeInstall = async () => {
  console.log('');
  const spinner = ora(chalk.dim('Resolving packages...')).start();
  await sleep(300);

  spinner.text = chalk.dim('Fetching dependency: ') + chalk.hex('#a855f7')('soumabrata-core@latest');
  await sleep(300);

  spinner.text = chalk.dim('Fetching dependency: ') + chalk.hex('#ec4899')('awesome-skills@v10.0.0');
  await sleep(300);

  spinner.text = chalk.dim('Linking dependencies...');
  await sleep(400);

  spinner.text = chalk.dim('Building optimized production bundle...');
  await sleep(500);

  spinner.succeed(chalk.green('Successfully installed ') + chalk.bold('Soumabrata v1.0.0') + chalk.dim(' in 1.8s'));
  await sleep(800);
};

const showCard = () => {
  // Clear the terminal first
  clear();

  // 1. The Big Aesthetic Title
  const title = figlet.textSync('HI  THERE !!', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
  });

  console.log(titleGradient(title));
  console.log(chalk.gray('  ( ˘ ɜ˘) ཕ  ') + chalk.hex('#c4b5fd')('Loading Soumabrata\'s profile...\n'));

  // 2. Build the Content String (Clean, aligned text)
  const label = (text) => chalk.bold.hex('#a855f7')(text.padEnd(12)); // Purple labels

  const content = `
  ${label('NAME')} ${data.name}
  ${label('STATUS')} ${data.title}

  ${label('GITHUB')} ${data.github}
  ${label('WEBSITE')} ${data.website}

  ${chalk.gray('─'.repeat(50))}

  ${label('LANGUAGES')} ${data.languages}
  ${label('STACK')} ${data.frameworks}
  ${label('TOOLS')} ${data.tools}

  ${chalk.gray('─'.repeat(50))}

  ${chalk.italic.white('  "Soumabrata is up for hire, ready to help your')}
  ${chalk.italic.white('   company get to next heights!"')}
`;

  // 3. Wrap it in a Box
  const boxedOutput = boxen(content, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'magenta',
    backgroundColor: '#1e1e1e',
  });

  console.log(boxedOutput);

  // Footer
  console.log(chalk.gray(`     Thanks for dropping by! `));
  console.log('');
};

const main = async () => {
  await runFakeInstall();
  showCard();
};

main();
