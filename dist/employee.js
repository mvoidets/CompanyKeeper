import inquirer from 'inquirer';
import { queryDB } from './connections.js';
import { getRoles } from './role.js';
// Function to get all departments
const getDepartments = async () => {
    const departments = await queryDB('SELECT id, depart_name FROM department');
    return departments.map(department => ({
        name: department.depart_name,
        value: department.id,
    }));
};
// Function to get roles by department ID
const getRolesByDepartment = async (departmentId) => {
    const roles = await queryDB('SELECT id, title FROM role WHERE department_id = $1', [departmentId]);
    return roles.map(role => ({
        name: role.title,
        value: role.id,
    }));
};
console.log(getRolesByDepartment);
// Function to get employees
const getEmployees = async () => {
    const employees = await queryDB('SELECT id, first_name, last_name FROM employee');
    return employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
    }));
};
// Add employee
const addEmployee = async () => {
    const departments = await getDepartments();
    const { first_name, last_name, department_id } = await inquirer.prompt([
        { type: 'input', name: 'first_name', message: 'Enter first name:' },
        { type: 'input', name: 'last_name', message: 'Enter last name:' },
        { type: 'list', name: 'department_id', message: 'Select department:', choices: departments },
    ]);
    const roles = await getRolesByDepartment(department_id);
    const employees = await getEmployees();
    // Add "None" option for manager selection
    employees.unshift({ name: 'None', value: null });
    const { role_id, manager_id } = await inquirer.prompt([
        { type: 'list', name: 'role_id', message: 'Select role:', choices: roles },
        { type: 'list', name: 'manager_id', message: 'Who is the employee\'s Manager:', choices: employees },
    ]);
    await queryDB('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
    console.log('Employee added successfully!');
};
// View employee
const viewEmployees = async () => {
    try {
        const employees = await queryDB(`
      SELECT 
        e.id,
        e.first_name, 
        e.last_name, 
        r.title, 
        d.depart_name AS department, 
        r.salary, 
        m.first_name AS manager_first_name, 
        m.last_name AS manager_last_name
      FROM 
        employee e
      JOIN 
        role r ON e.role_id = r.id
      JOIN 
        department d ON r.department_id = d.id
      LEFT JOIN 
        employee m ON e.manager_id = m.id;`);
        console.table(employees);
    }
    catch (error) {
        console.error('Error fetching employees:', error);
    }
};
// Update employee
const updateEmployee = async () => {
    const roles = await getRoles();
    const employees = await getEmployees();
    const { id, first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'Enter employee ID to update:' },
        { type: 'input', name: 'first_name', message: 'Enter new first name (leave blank to skip):' },
        { type: 'input', name: 'last_name', message: 'Enter new last name (leave blank to skip):' },
        { type: 'list', name: 'role_id', message: 'Select new role (leave blank to skip):', choices: roles, when: (answers) => !answers.role_id },
        { type: 'list', name: 'manager_id', message: 'Who is the new manager (leave blank to skip):', choices: employees }, //, when: (answers): boolean => !answers.manager_id },
    ]);
    const updates = [];
    const params = [];
    if (first_name) {
        updates.push(`first_name = $${params.length + 1}`);
        params.push(first_name);
    }
    if (last_name) {
        updates.push(`last_name = $${params.length + 1}`);
        params.push(last_name);
    }
    if (role_id) {
        updates.push(`role_id = $${params.length + 1}`);
        params.push(role_id);
    }
    if (manager_id) {
        updates.push(`manager_id = $${params.length + 1}`);
        params.push(manager_id);
    }
    if (updates.length > 0) {
        const query = `UPDATE employee SET ${updates.join(', ')} WHERE id = $${params.length + 1}`;
        params.push(id);
        await queryDB(query, params);
        console.log('Employee updated successfully!');
    }
    else {
        console.log('No updates provided.');
    }
};
// Delete employee
const deleteEmployee = async () => {
    const { id } = await inquirer.prompt({
        type: 'input',
        name: 'id',
        message: 'Enter employee ID to delete:',
    });
    await queryDB('DELETE FROM employee WHERE id = $1', [id]);
    console.log('Employee deleted successfully!');
};
export { addEmployee, viewEmployees, updateEmployee, deleteEmployee };
