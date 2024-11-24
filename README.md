# Role-Based Access Control (RBAC) UI

## Overview
This project implements a **Role-Based Access Control (RBAC)** User Interface, providing intuitive management of users, roles, and permissions. Designed with React and Material-UI, the application enables dynamic and secure control of system access.

---

## Features
### Core Requirements
1. **User Management**:
   - View and manage users in the system.
   - Add, edit, or delete users.
   - Assign roles to users and manage their status (e.g., Active/Inactive).

2. **Role Management**:
   - Define and edit roles.
   - Assign roles with specific permissions (e.g., Read, Write, Delete) or custom attributes.

3. **Dynamic Permissions**:
   - Assign and modify permissions for roles dynamically.
   - Clearly display permissions for roles, enabling intuitive edits.

4. **Custom API Simulation (Optional)**:
   - Mock CRUD operations for users and roles via `json-server`.
   - Simulate server responses to validate functionality.

---

## Project Structure
### Directory Layout
```

rbac-ui/
├── node_modules/             # Project dependencies
├── public/                   # Public assets and HTML templates
├── src/                      # Source code
│   ├── @mui/                 # Material-UI theme customizations
│   ├── components/           # Reusable React components
│   ├── pages/                # Page-level components (e.g., HomePage, UserManagement)
│   │   ├── AddRolePage.js    # Page for adding roles
│   │   ├── AddUserPage.js    # Page for adding users
│   │   ├── EditUserPage.js   # Page for editing users
│   │   ├── HomePage.js       # Home page component
│   │   ├── NotFound.js       # 404 page component
│   ├── services/             # API integrations (e.g., axios configuration)
│   │   └── api.js            # API configuration file
│   ├── App.js                # Main application file
│   ├── App.css               # Global styles
│   ├── index.js              # Application entry point
│   └── db.json               # Mock database for users and roles
├── .gitignore                # Files to ignore in version control
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Locked dependency tree
└── README.md                 # Project documentation
```


## Technology Stack

- **Frontend**:
  - React (v18.3.1)
  - Material-UI (MUI) (v6.1.8)
  - React Router DOM (v7.0.1)
- **Mock Backend**:
  - JSON Server


# Installation and Setup

### Clone the repository:
> git clone https://github.com/aioont/RBACUI.git

### Install dependencies:
> cd RBACUI

> npm install

### Start the Mock API server:
### Install JSON Server globally if not installed
> npm install -g json-server

## Start JSON Server
> json-server --watch db.json --port 3000
###### OR
> npm run server

### Start the development server:
> npm start


# API Structure

The mock API (`db.json`) contains the following structure:

```json
{
  "users": [
    {
      "id": "string",
      "username": "string",
      "email": "string",
      "role": "string",
      "status": "boolean"
    }
  ],
  "roles": [
    {
      "id": "string",
      "name": "string",
      "permissions": ["string"]
    }
  ]
}
```

# Key Features
## User Management
- Add, edit, and delete users.
- Assign roles and update statuses.
## Role Management
- Create new roles.
- Update role permissions dynamically.
## Permissions
- Clearly view and manage permissions associated with each role.
- 



https://github.com/user-attachments/assets/f3bc3b07-4220-41b4-8616-65efe4e1cbe4


