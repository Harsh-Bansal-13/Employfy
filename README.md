# AuthScreen React App with User Management

## Overview

This React app integrates a user authentication system with the **Reqres API** for login. It features user management functionalities such as **search**, **edit**, **fetch**, and **delete users**. The app provides a smooth user experience with validation, password visibility toggle, and clean CSS design, while interacting with a REST API.

### Features:

- **Login Form**: Authenticate users using email and password.
- **Search**: Search users based on their names or emails.
- **Edit User**: Modify user details such as name and email.
- **Delete User**: Remove users from the list.
- **Input Validation**: Ensures both email and password fields are filled before submitting the form.
- **Error Handling**: Displays error messages for invalid credentials, missing fields, and other issues.
- **Password Visibility Toggle**: Option to toggle password visibility.
- **Loading State**: Shows loading text and disables the button during the login process.
- **Responsive Design**: Fully responsive UI for mobile and desktop.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (Version 14 or above)
- **npm** (Node Package Manager, included with Node.js)

## Getting Started

Follow these steps to set up and run the app locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/authscreen-react-app.git
```

### 2. Navigate to the Project Directory

```bash
cd authscreen-react-app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm start
```

This will run the app in the development mode and open it in your browser at `http://localhost:3000`.

---

## Functionality

### 1. **Login Form**

- The app allows users to log in using their **email** and **password**.
- It checks if both fields are filled before allowing the user to submit the form.
- Upon successful login, a token is stored in **localStorage** for future use.

### 2. **Validation**

- **Email and Password Validation**: Ensures both fields are filled before submission.
- **Error Handling**: If invalid credentials are entered or the API request fails, an error message is displayed.

### 3. **Search Functionality**

- Users can search the list of users by **first name**, **last name**, or **email**.
- The search filters are applied on the client side, making it fast and responsive.

### 4. **Edit User**

- Users can **edit** their details (first name, last name, email) after selecting a user from the list.
- A form is displayed pre-filled with the user’s current data.
- The updated data is sent to the API, and the user list is refreshed with the modified information.

### 5. **Delete User**

- Users can **delete** a user from the list.
- The app sends a `DELETE` request to the API, and upon success, the user is removed from the list.
- An appropriate success or error message is displayed based on the outcome.

### 6. **Password Visibility Toggle**

- A button is added to toggle the visibility of the password input field (show/hide).
- Clicking "Show" reveals the password, while clicking "Hide" obscures it.

### 7. **Loading State**

- While the login request is in progress, the login button shows "Logging in..." and is disabled to prevent multiple submissions.

### 8. **Error Handling**

- Displays clear error messages if:
  - Fields are empty.
  - Invalid login credentials are entered.
  - API call fails.

---

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Axios**: A promise-based HTTP client for making API requests.
- **Framer Motion**: A library for animations in React.
- **Tailwind CSS**: A utility-first CSS framework for styling.

---

## File Structure

```
/src
  /components
    AuthScreen.js         # The main login screen component
    UserList.js           # Component for displaying and managing users
    EditUser.js           # Component for editing a user
  /App.js                 # The entry point of the app, renders AuthScreen and UserList
  /index.js               # Main JavaScript file for rendering the React app
  /index.css              # Global styles
  /tailwind.config.js     # Tailwind CSS configuration file
  /postcss.config.js      # PostCSS configuration file
  /package.json           # npm package configuration file
```

---

## Example of User Management Flow

1. **Login**: The user logs in using the **email** and **password**.
2. **Search**: After login, users can search for other users by name or email.
3. **Edit User**: Users can edit the name or email of a selected user.
4. **Delete User**: Users can delete any user from the list.

---

## Customization

### API Integration

The app is connected to **Reqres API** (`https://reqres.in/`) for user data management. You can modify the API endpoints and handle real user authentication if needed.

### User List Management

- Modify the `UserList.js` and `EditUser.js` components to add more fields or customization based on your requirements.

---

## Future Enhancements

- **Form Validation**: Enhance form validation with more robust checks (e.g., email regex).
- **User Authentication**: Implement user authentication using a backend service (JWT tokens, etc.).
- **Responsive Design**: Further refine mobile and tablet views for better usability.
- **Error Feedback**: Improve error handling by categorizing and handling different error types (e.g., network issues).

---

## License

This project is licensed under the **MIT License**.

---
