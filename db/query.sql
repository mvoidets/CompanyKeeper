
SELECT 
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
    employee m ON e.manager_id = m.id;
