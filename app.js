const { writeFile, copyFile } = require("./utils/generate-site.js");

// // require fs is needed to connect and make use of its functions / not needed at final stage of module.
const fs = require("fs");
// require will call the inquirer module to use its functions
const inquirer = require("inquirer");
// this will call html generate page function from the page-template file
const generatePage = require("./src/page-template");

const promptUser = () => {
  // this returns the result of the prompt call
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name? (Required)",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username (Required)",
      validate: (githubInput) => {
        if (githubInput) {
          return true;
        } else {
          console.log("Please enter your GitHub username!");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        'Would you like to enter some information about yourself for an "About" section?',
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
    },
  ]);
};

// variable holding function for data storage
const promptProject = (portfolioData) => {
  console.log(`
=================
Add a New Project
=================
`);

  // conditional statement saying that if we dont have anything in
  // if theres no 'projects' array property then create one
  if (!portfolioData.projects) {
    // portdata.proj will equal an empty array to hold data when called
    portfolioData.projects = [];
  }
  return (
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of your project? (Required)",
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log("You need to enter a project name!");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "description",
          message: "Provide a description of the project (Required)",
          validate: (descriptionInput) => {
            if (descriptionInput) {
              return true;
            } else {
              console.log("You need to enter a project description!");
              return false;
            }
          },
        },
        {
          type: "checkbox",
          name: "languages",
          message: "What did you this project with? (Check all that apply)",
          choices: [
            "JavaScript",
            "HTML",
            "CSS",
            "ES6",
            "jQuery",
            "Bootstrap",
            "Node",
          ],
        },
        {
          type: "input",
          name: "link",
          message: "Enter the GitHub link to your project. (Required)",
          validate: (linkInput) => {
            if (linkInput) {
              return true;
            } else {
              console.log("You need to enter a project GitHub link!");
              return false;
            }
          },
        },
        {
          type: "confirm",
          name: "feature",
          message: "Would you like to feature this project?",
          default: false,
        },
        {
          type: "confirm",
          name: "confirmAddProject",
          message: "Would you like to enter another project?",
          default: false,
        },
      ])
      // In the below expression, we use the array method push()
      // to place the projectData from inquirer into the new projects
      // array we just created.
      .then((projectData) => {
        portfolioData.projects.push(projectData);
        // if user selects that they would like to add another project this
        // will evaluate to true and call the promptproject(portfoliodata) function
        // to store the newly added project data
        // if portfoliodata is not part of the argument, new array will be initialized
        // and previous data will be lost
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
          // similar to above, if user selects they would NOT like to add
          // another project this will evaluate to false and trigger to return.
          // must explicitly state the return in else, critical to retrieving answer
        } else {
          return portfolioData;
        }
      })
  );
};

promptUser()
  .then(promptProject)
  .then((portfolioData) => {
    return generatePage(portfolioData);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .then((writeFileResponse) => {
    console.log(writeFileResponse);
    return copyFile();
  }) 
  .then((copyFileResponse) => {
    console.log(copyFileResponse);
  })
  .catch((err) => {
    console.log(err);
  });

// ---------- below for reference same functionality as above -----------

// We therefore append the .then() method to the function call, since it
// returns a Promise, and we put into .then() whatever we wish to take place
//  after the Promise is resolved.
// we can chain functions together using .then
// promptUser()
//   .then(promptProject)
//   .then(portfolioData => {
// invokes generatePage() and creates an html page.
// const pageHTML = generatePage(portfolioData);
// fs.writeFile('./dist/index.html', pageHTML, err => {
//   if (err) throw new Error(err);
//   console.log('Page created! Check out index.html in this directory to see it!');

// pulls from the src style.css
//     fs.copyFile('./src/style.css', './dist/style.css', err => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       console.log("sheet copied");
//     })
//   });
// });
