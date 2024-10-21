INSERT INTO department ( depart_name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');


INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 100000, 1),
       ('Sales Lead', 75000, 1),
       ('Salesperson', 50000, 3),
       ('Lead Engineer', 100000, 2),
       ('Software Engineer', 75000, 2),
       ('Accountant', 75000, 3),
       ('Legal Team Lead', 100000, 4),
       ('Lawyer', 75000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)   
VALUES ('Mary', 'Smith', 1, NULL),
       ('Kevin', 'Johnson', 2, 1),
       ('Tina', 'Lee', 3, 1),
       ('John', 'Doe', 4, NULL),
       ('Jane', 'Doe', 5, 4),
       ('Alice', 'Williams', 6, 4),
       ('Charlie', 'Brown', 7, 4),
       ('Diana', 'Smith', 8, 3);