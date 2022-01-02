const fs = require("fs");

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
      fs.writeFile('./dist/index.html', fileContent, err => {
        // if theres an error reject the promise and send error to stop function
        if (err) {
          reject(err);
          //return out of the function here to make sure promise doesnt succeed
          return;
        }
        // if no errors, resolve promise and send success
        resolve({
          ok: true,
          message: 'file created!'
        })
      })
    })
  }
  
// copying file
const copyFile = () => {
    return new Promise((resolve, reject) => {
      fs.copyFile('./src/style.css', './dist/style.css', err => {
        if (err) {
          reject(err);
          return;
        }
  
        resolve({
          ok: true,
          message: 'Stylesheet created!'
        });
      });
    });
  };

  module.exports = { writeFile, copyFile };