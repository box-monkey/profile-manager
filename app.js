// require will call the inquirer module to use its functions
const inquirer = require('inquirer');
// // require fs is needed to connect and make use of its functions
// const fs = require('fs');
// // this will call html generate page function from the page-template file
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

inquirer
.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'what is your name?'
  }
])
.then(answers => console.log(answers));

// fs.writeFile('index.html', generatePage(name, github), err => {
//   if (err) throw err;

//   console.log('portfolio complete! Check out the index.html to see the output!')
// })
