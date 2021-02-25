const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

async function question(){
    const teamArray= [];
    let formComplete='';
    do{
        try{
        let response= await inquirer.prompt([
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
    let response2= '';
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
            response2 = await inquirer.prompt([{
                type: 'input',
                name: 'officeNumber',
                message: 'What is the office number for the employee?: '
            }]);
            const manager= new Manager(response.name, response.id, response.email, response2.officeNumber);
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

