#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import gradient from 'gradient-string';

// Clear the terminal first
clear();

// Pastel Purple Gradient to match site theme
const purpleGradient = gradient(['#fdf4ff', '#c4b5fd', '#a855f7']);

// Helper to print headers using Figlet
const printHeader = (text) => {
  console.log(purpleGradient(figlet.textSync(text, {
    font: 'Pagga', // Compact, blocky font
    horizontalLayout: 'default',
    verticalLayout: 'default'
  })));
};

// Define data
const data = {
  name: chalk.white('Soumabrata Ghosh'),
  status: chalk.white('Fullstack Developer'),
  github: chalk.gray('https://github.com/') + chalk.cyan('Souma061'),
  website: chalk.gray('https://') + chalk.cyan('soumabrata.dev'),

  labelName: chalk.bold.green('NAME    '),
  labelStatus: chalk.bold.green('STATUS  '),
  labelGitHub: chalk.bold.green('GITHUB  '),
  labelWeb: chalk.bold.green('WEBSITE '),
};

const labels = {
  LANGUAGES: chalk.bold.green('LANGUAGES    '),
  FRAMEWORKS: chalk.bold.green('FRAMEWORKS   '),
  TOOLS: chalk.bold.green('TOOLS        ')
};

const skills = {
  languages: chalk.white('JavaScript, Python, C++'),
  frameworks: chalk.white('React, ' + chalk.magenta('Node.js') + ', Express, MongoDB'),
  tools: chalk.white('Git, VS Code, Postman')
};

const main = async () => {
  // Top kawaii line
  console.log(chalk.gray('( ˘ ɜ˘) ཕ'));

  // Huge "HI THERE!!"
  console.log(purpleGradient(figlet.textSync('HI THERE!!', { font: 'ANSI Shadow' }))); // Big bold standard font for main title

  console.log(chalk.magenta('✔ ') + 'Loading Soumabrata\'s details\n');

  printHeader('PERSONAL DETAILS');
  console.log(` ${data.labelName}  -  ${data.name}`);
  console.log(` ${data.labelStatus}  -  ${data.status}`);
  console.log(` ${data.labelGitHub}  -  btw its awesome -> (${data.github})`);
  console.log(` ${data.labelWeb}  -  Coolest thing   -> (${data.website})`);
  console.log('');

  printHeader('SKILLS');
  console.log(` ${labels.LANGUAGES} -  ${skills.languages}`);
  console.log(` ${labels.FRAMEWORKS} -  ${skills.frameworks}`);
  console.log(` ${labels.TOOLS}      -  ${skills.tools}`);
  console.log('');

  printHeader('MESSAGE');
  console.log(' Soumabrata is up for hire, ready to help your company get to next heights!');
  console.log(' Thanks for checking out my cli!');
  console.log('');
};

main();
