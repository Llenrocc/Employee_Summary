const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");

const inquirer = require("inquirer");
const fs = require("fs");

// Start the app

async function start() {
    console.log("Let's create your Team!");

    let teamHTML = "";
    let teamSize;

    await inquirer.prompt ({
        type: "number",
        message: "How many people are on your Team?",
        name: "noOfTeamMem"
    }).then ((data) => {

        // Add 1 to start user
        teamSize = data.noOfTeamMem + 1;
    });

    // If no one on team, app will stop
    if (teamSize === 0) {
        console.log("There is no one on your team.");
        return;
    }

    // Asks users questions depending on number of team members
    for (i = 1; i < teamSize; i++) {
        let name;
        let id;
        let title;
        let email;

        // Prompts user to answer questions 
        await inquirer.prompt([
            {
                type: "input",
                message: `What is the employee (${i})'s name?`,
                name: "name"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s id?`,
                name: "id"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s Email?`,
                name: "email"
            },
            {
                type: "list",
                message: `What is the employee (${i})'s title?`,
                name: "title",
                choices: ["Engineer", "Intern", "Manager"]
            }
        ]).then((data) => {
            // Takes all the data from user and places the value in global variable
            name = data.name;
            id = data.id;
            title = data.title;
            email = data.email;
        });

        switch (title) {
            case "Manager":

            // Ask the user for the Managers office number
            await inquirer.prompt([
                {
                    type: "input",
                    message: "What is your Manager's Office Number?",
                    name: "officeNo"
                }
            ]).then((data) => {

                // create a new object with user data
                const manager = new Manager(name, id, email, data.officeNo);

                teamMember = fs.readFileSync("templates/manager.html");

                teamHtml = teamHTML + "\n" + eval('`'+ teamMember +'`');
            });
            break;

            // Ask for school name intern is attending, then ask for name, email
            case "Intern":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What school is your Intern attending?",
                        name: "school"
                    }
                ]).then((data) => {
                    const intern = new Intern(name, id, email, data.school);
                    teamMember = fs.readFileSync("templates/intern.html");
                    teamHTML = teamHTML + "\n" + eval('`'+ teamMember +'`');
                });
                break;

            
            case "Engineer":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your Engineers Github?",
                        name: "github"
                    }
                ]).then((data) => {
                    const engineer = new Engineer(name, id, email, data.github);
                    teamMember = fs.readFileSync("templates/engineer.html");
                    teamHTML = teamHTML + "\n" + eval('`'+ teamMember +'`');
                });
                break;    

        }
    }
// places html in variable
    const mainHTML = fs.readFileSync("templates/main.html");

    teamHTML = eval('`'+ mainHTML +'`');

    fs.writeFile("output/team.html", teamHTML, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log ("Success");
    });
}
start();