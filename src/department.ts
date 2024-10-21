import inquirer from 'inquirer';
import { queryDB } from './connections.js';


const addDepartment = async () => {
    const { depart_name } = await inquirer.prompt({
      type: 'input',
      name: 'depart_name',
      message: 'Enter department name:',
    });
  
    await queryDB('INSERT INTO department (depart_name) VALUES ($1)', [depart_name]);
    console.log('Department added successfully!');
  };
  
  const viewDepartments = async () => {
    const departments = await queryDB('SELECT * FROM department');
    console.table(departments);
  };
  const getDepartments = async () => {
    const departments = await queryDB('SELECT id, depart_name FROM department');
    return departments.map(department => ({
      name: department.depart_name,
      value: department.id
    }));
  };

  
  

//delete department
  const deleteDepartment = async () => {
    const { id } = await inquirer.prompt({
      type: 'input',
      name: 'id',
      message: 'Enter Department ID to delete:',
    });
  
    await queryDB('DELETE FROM department WHERE id = $1', [id]);
    console.log('Department deleted successfully!');
  };
  
  export {addDepartment, viewDepartments, deleteDepartment, getDepartments};
  
