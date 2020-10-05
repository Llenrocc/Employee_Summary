const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const fs = require("fs");
const { title } = require("process");

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
    if (teamsize === 0) {
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

                // create a new object with user input data
                
            })
        }
    }

}