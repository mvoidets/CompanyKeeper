// src/index.js
import inquirer from 'inquirer';
import { connectDB, disconnectDB } from './connections.js';
import { addDepartment, viewDepartments } from './department.js';
import { addEmployee, viewEmployees, updateEmployee, deleteEmployee } from './employee.js';
import { addRole, viewRoles } from './role.js';
const main = async () => {
    await connectDB();
    while (true) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Update Employee',
                'Delete Employee',
                'Exit'
            ],
        });
        switch (action) {
            case 'Add Department':
                await addDepartment();
                break;
            case 'View Departments':
                await viewDepartments();
                break;
            case 'Add Role':
                await addRole();
                break;
            case 'View Roles':
                await viewRoles();
                break;
            case 'Add Employee':
                await addEmployee();
                break;
            case 'View Employees':
                await viewEmployees();
                break;
            case 'Update Employee':
                await updateEmployee();
                break;
            case 'Delete Employee':
                await deleteEmployee();
                break;
            case 'Exit':
                await disconnectDB();
                return; // Exit the loop and function
        }
    }
};
main().catch(err => {
    console.error('Error:', err);
    disconnectDB();
});
