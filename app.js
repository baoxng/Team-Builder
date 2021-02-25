const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const teamArray= [];

async function question(){
    let formComplete='';
    do{
        try{
        response= await inquirer.prompt([
            {
                type: 'input',
                name:'name',
                message: 'What is the name of the employee? : '
            },
            {
                type: 'input',
                name: 'id',
                message: 'Enter the employee ID here: '
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is email for employee? : ',
            },
            {
                type: 'list',
                name: 'role',
                message: 'What role does this employee have? : ',
                choices: ['Engineer', 'Intern', 'Manager']
            }
        ]);
    let response2 = '';
        if (response.role === 'Engineer'){
            response2= await inquirer.prompt([{
                type: 'input',
                name:'github',
                message: 'What is the github username for employee?: ',
            }]);
            const engineer= new Engineer(response.name, response.id, response2.github);
            teamArray.push(engineer);
        }
        else if (response.role === 'Intern'){
            response2= await inquirer.prompt([{
                type: 'input',
                name: 'school',
                message: 'What school is employee currently attending?: '    
            }]);
            const intern= new Intern(response.name, response.id, response.email, response2.school);
            teamArray.push(intern);
        }
        else if (response.role === 'Manager'){
            response2.Name= await inquirer.prompt([{
                type: 'input',
                name: 'office',
                message: 'What is the office number for the employee?: '
            }]);
            const manager= new Manager(response.name, response.id, reponse.email, response2.office);
            teamArray.push(manager);
        }

    }
    catch(err){
        return console.log(err);
    }
    console.log(teamArray)
    formComplete= await inquirer.prompt([{
        type:'list',
        name: 'finish',
        message: 'Do you want to continue?: ',
        choices:[
            'Yes',
            'No'
        ]
    }]);
    } 
    while (formComplete.finish === "Yes"){
        fs.writeFile(outputPath, render(teamArray), function(err){
            if (err){
                console.log(err);
            }
            else{
            console.log('team.html has been created')
            }
        })
    }
};

question();





// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
