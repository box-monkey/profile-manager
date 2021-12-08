// require fs is needed to connect and make use of its functions
const fs = require('fs');
// this will call html generate page function from the page-template file
const generatePage = require('./src/page-template.js');

// profiledataargs holds the users commands 
const profileDataArgs = process.argv.slice(2, process.argv.length);
// these will extract and store 
const [name, github] = profileDataArgs;



fs.writeFile('index.html', generatePage(name, github), err => {
  if (err) throw err;

  console.log('portfolio complete! Check out the index.html to see the output!')
})
