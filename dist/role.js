import inquirer from 'inquirer';
import { queryDB } from './connections.js';
import { getDepartments } from './department.js';
//add Role
const addRole = async () => {
    const departments = await getDepartments();
    const { title, salary, department_id } = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter role title:' },
        { type: 'input', name: 'salary', message: 'Enter salary:' },
        { type: 'list', name: 'department_id', message: 'Enter department ID:', choices: departments },
    ]);
    await queryDB('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    console.log('Role added successfully!');
};
//view Role
const viewRoles = async () => {
    const roles = await queryDB('SELECT * FROM role');
    console.table(roles);
};
//delete Role
const deleteRole = async () => {
    const { id } = await inquirer.prompt({
        type: 'input',
        name: 'id',
        message: 'Enter Role ID to delete:',
    });
    await queryDB('DELETE FROM role WHERE id = $1', [id]);
    console.log('Role has been deleted successfully!');
};
// Function to get all roles
const getRoles = async () => {
    const roles = await queryDB('SELECT id, title FROM role');
    return roles.map(role => ({
        name: role.title,
        value: role.id,
    }));
};
export { addRole, viewRoles, deleteRole, getRoles };
