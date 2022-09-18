const { validate } = require("@babel/types");
const fs = require("fs");
const inquirer = require("inquirer");

const Employee = require('./lib/employee');

const employees = [];

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
      // loop: (options, true),
      // validate: (answer) => {
      //   if (answer.length !== 1) {
      //     return "Please select exactly one option.";
      //   }
      //   return true;
      // },
    },

    {
      type: "input",
      message: "Please enter the intern's name, ID, email, and GitHub username",
      name: "intern",
      when: (answers) => answers.options == "Add an intern",
      // loop: (options, true),
    },
  ])
  .then((response) => {
    if (response.options == "Add an engineer") {
      var engData = response.engineer.split(" ");
      var engineer = new Employee(engData[0], engData[1], engData[2]);
      // var engineer = {
      //   title: "Engineer",
      //   name: engData[0],
      //   id: engData[1],
      //   email: engData[2],
      //   gitHub: engData[3],
      // }
      // employees.push(engineer);
      console.log(engineer);
    }
    // if (response.options == "Add an intern") {
    //   var internData = response.intern.split(" ");
    //   var intern = {
    //     title: "Intern",
    //     name: internData[0],
    //     id: internData[1],
    //     email: internData[2],
    //     gitHub: internData[3],
    //   }
    //   employees.push(intern);
    // }
    // if (response.options == "Finished") {
    //   fs.writeFile('dist.html', )
    // }
    // console.log(employees);
  });
