const { validate } = require("@babel/types");
const fs = require("fs");
const inquirer = require("inquirer");

const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const cards = [];

// const init = () => {
//   return inquirer
//     .prompt([
//       {
//         type: "input",
//         message: "Please enter team manager’s name.",
//         name: "managerName",
//       },
//       {
//         type: "input",
//         message: "Please enter team manager’s employee ID.",
//         name: "managerId",
//       },
//       {
//         type: "input",
//         message: "Please enter team manager’s email address.",
//         name: "managerEmail",
//       },
//       {
//         type: "input",
//         message: "Please enter team manager’s office number.",
//         name: "managerOffice",
//       },
//     ])
//     .then((response) => {
//       console.log(response);
//       menu();
//     });
// };

// init();

// const menu = () => {
//   return inquirer
//     .prompt([
//       {
//         type: "checkbox",
//         message: "Select an option: ",
//         name: "options",
//         choices: ["Add an engineer", "Add an intern", "Finished"],
//         validate: (answer) => {
//           if (answer.length !== 1) {
//             return "Please select exactly one option.";
//           }
//           return true;
//         },
//       },
//     ])
//     .then((response) => {
//       if (response.options == "Add an engineer") {
//         promptEngineer();
//       }
//     });
// };

// const promptEngineer = () => {
//   return inquirer
//     .prompt([
//       {
//         type: "input",
//         message: "Type something in",
//         name: "promptEngineer",
//       },
//     ])
//     .then((response) => {
//       menu();
//     });
// };

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
    if (response.options == "Add an engineer") {
      var engData = response.engineer.split(" ");
      var anEngineer = new Engineer(
        engData[0],
        engData[1],
        engData[2],
        engData[3]
      );
      var engCard = `<div class="card mx-3 my-3" style="width: 18rem">
      <div class="card-header bg-primary text-light text-center">
        ${anEngineer.getName()} <br />
        ${anEngineer.getRole()}
      </div>
      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li class="list-group-item border">${anEngineer.getId()}</li>
          <li class="list-group-item border"><a class="card-link" href="mailto: ${anEngineer.getEmail()}">${anEngineer.getEmail()}</a></li>
          <li class="list-group-item border"><a class="card-link" href="https://github.com/${anEngineer.getGitHub()}">${anEngineer.getGitHub()}</a></li>
        </ul>
      </div>
    </div>`;

      // employees.push(engineer);
      console.log(anEngineer);
      cards.push(engCard);
    }
    if (response.options == "Add an intern") {
      var internData = response.intern.split(" ");
      var anIntern = new Intern(
        internData[0],
        internData[1],
        internData[2],
        internData[3]
      );
      var internCard = `<div class="card mx-3 my-3" style="width: 18rem">
        <div class="card-header bg-primary text-light text-center">
          ${anIntern.getName()} <br />
          ${anIntern.getRole()}
        </div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item border">${anIntern.getId()}</li>
            <li class="list-group-item border"><a class="card-link" href="mailto: ${anIntern.getEmail()}">${anIntern.getEmail()}</a></li>
            <li class="list-group-item border">${anIntern.getSchool()}</li>
          </ul>
        </div>
      </div>`;

      console.log(anIntern);
      cards.push(internCard);
    }
    fs.appendFile(
      "./dist/myTeam.html",
      `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
          integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"
          crossorigin="anonymous"
        />
        <link rel="stylesheet" href="style.css" />

        <title>Team Profile Generator</title>
      </head>
      <body>
        <div class="jumbotron text-center bg-danger text-light">
          <h1 class="display-4">My Team</h1>
        </div>
        <div class="row">
          ${cards}
        </div>

        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct"
          crossorigin="anonymous"
        ></script>
      </body>
    </html>`,
      (error, data) => (error ? console.error(error) : console.log(data))
    );
  });
