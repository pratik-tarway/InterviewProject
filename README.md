# InterviewProject

This project is a full-stack application with a backend API, frontend interface, and an SQLite database. It features two types of users: **Admin** and **User**.

## Features

- **Admin**:
  - Perform CRUD (Create, Read, Update, Delete) operations on products.
  - View a dashboard with product statistics.
  - Search and filter products.
  
- **User**:
  - View the list of products.
  - Search and filter products.

---

## Technologies Used

### Backend (C# API)
- **ASP.NET Core Web API**: Framework used to build the backend API.
- **Dapper**: Lightweight Object-Relational Mapper (ORM) for interacting with the SQLite database.
- **JWT (JSON Web Token)**: Used for secure user authentication and authorization.
- **SQLite**: Database used to store product information.

### Frontend (React)
- **React**: Frontend framework used to build the user interface.
- **Vite**: Build tool used to set up the React app for fast development.
- **Material-UI**: React component library for building modern and responsive UIs.
- **Axios**: Used for making HTTP requests from the React app to the API.
- **CSS**: For styling and layout.
- **Responsive Design**: The web application is designed to be mobile-friendly, providing a good experience on mobile devices and desktops.

---

## Software Required

To run this project locally, you'll need the following software installed on your machine:

- **Visual Studio** (for backend development, with C# support)  
  Install from: https://visualstudio.microsoft.com/

- **Visual Studio Code** (for frontend development)  
  Install from: https://code.visualstudio.com/

- **Node.js** (for running the React frontend)  
  Install from: https://nodejs.org/

- **SQLite Database Browser** (for managing the SQLite database)  
  Install from: https://sqlitebrowser.org/dl/

- **.NET SDK** (for the backend C# API)  
  Install from: https://dotnet.microsoft.com/download

---

## How to Run the Project

Follow these steps to run the project locally:

### 1. **Clone the Repository**
Clone the repository to your local machine using Git:

```
git clone https://github.com/your-username/interviewproject.git
cd interviewproject
```

### 2. **Backend Setup (C# API)**

Navigate to the `backend` folder:

```
cd backend
```

Restore the .NET dependencies:

```
dotnet restore
```

Update the **SQLite connection string** in the `appsettings.json` file to point to the correct location of your SQLite database file. It should look something like this:

```json
"ConnectionStrings": {
  "DefaultConnection": "Data Source=path_to_your_database_file.sqlite"
}
```

Replace `path_to_your_database_file.sqlite` with the actual file path on your system.

**Run the C# API**:

Open the solution in **Visual Studio**. Once open, simply click the **Run** button (the green play button) in Visual Studio to start the backend API.

### 3. **Frontend Setup (React)**

Navigate to the `frontend` folder:

```
cd frontend
```

Install the necessary Node.js dependencies:

```
npm install
```

Run the React app:

```
npm dev run
```

The React frontend will be available at `http://localhost:3000` (default).

---

## User Roles

There are two types of users:

### 1. **Admin**:
- **Access**: Admin can access the dashboard, create, update, and delete products.
- **Features**:
  - **CRUD operations** on products (Create, Read, Update, Delete).
  - View a dashboard showing product statistics.
  - **Search** and **Filter** products based on different criteria.

- **Credentials**:
  - **Username**: `admin`
  - **Password**: `password`

### 2. **User**:
- **Access**: Users can only view products.
- **Features**:
  - **View** the product list.
  - **Search** and **Filter** products based on different criteria.

- **Credentials**:
  - **Username**: `john_doe3`
  - **Password**: `securePassword12345`

---

