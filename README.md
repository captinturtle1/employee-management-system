# Employee Management System

## Overview

The Employee Management System is a React application built with Next.js, providing a user-friendly interface to manage employees in a MySQL database. This system allows users to perform operations such as adding, deleting, and updating employee records. Additionally, it includes a "Reports" section to generate insightful reports, such as salary ranges and recently hired employees.

## Features

- Add, delete, and update employee records.
- Generate reports, including salary ranges and recently hired employees.
- Securely access the MySQL database using Next.js API routes.
- Utilizes Prisma as the ORM to interact with the MySQL database.
- Styling powered by Tailwind CSS.

## Installation

1. Clone the repository:

        git clone https://github.com/captinturtle1/employee-management-system.git

2. Change to the project directory:

        cd employee-management-system

3. Install dependencies:

        npm install

4. Set up the MySQL database and configure the necessary environment variables (details in the next section).

5. Run the development server:

        npm run dev

6. Open your browser and navigate to http://localhost:3000.

## Configuration

1. Set up a MySQL database and note down the connection details.

2. Create a .env file in the project root and add the following:

        DATABASE_URL="mysql://username:password@localhost:3306/your_database"

    Replace username, password, localhost, 3306, and your_database with your actual MySQL credentials.

## Usage

1. Run the development server:

        npm run dev

2. Open your browser and navigate to http://localhost:3000.

3. Explore and use the Employee Management System.

## Contributing

Feel free to contribute to this project by forking the repository, creating a new branch, and submitting a pull request.

## License

This project is licensed under the MIT License.

