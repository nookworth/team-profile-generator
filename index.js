const { validate } = require("@babel/types");
const fs = require("fs");
const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "input",
      message:
        "Please enter team manager’s name, employee ID, email address, and office number.",
      name: "manager",
    },
    {
      type: "checkbox",
      message: "Select an option: ",
      name: "options",
      choices: ["Add an engineer", "Add an intern", "Finished"],
      validate: (answer) => {
        if (answer.length !== 1) {
          return "Please select exactly one option.";
        }
        return true;
      },
    },
    {
      type: "input",
      message:
        "Please enter the engineer’s name, ID, email, and GitHub username",
      name: "engineer",
      when: (answers) => answers.options == "Add an engineer",
    },

    {
      type: "input",
      message: "Please enter the intern's name, ID, email, and GitHub username",
      name: "intern",
      when: (answers) => answers.options == "Add an intern",
    },
  ])
  .then((response) => {
    console.log(response);
  });
