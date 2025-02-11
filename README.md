# Project Name

## Description
This is a full-stack web application built with modern technologies for both the frontend and backend. The project uses:

- **Frontend**: React with Tailwind CSS for a responsive and visually appealing UI.
- **Backend**: Koa.js with Apollo Server and GraphQL to provide a flexible API.
- **Database**: MongoDB to store and manage application data.

## Features
- User authentication and authorization
- GraphQL API for efficient data fetching
- Responsive design using Tailwind CSS
- Secure connection to MongoDB

## Technologies Used

### Frontend
- React
- Tailwind CSS
- Apollo Client

### Backend
- Koa.js
- Apollo Server (GraphQL)
- MongoDB

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or later)
- MongoDB (running locally or via Docker)

### Clone the Repository
```sh
git clone https://github.com/GuillermoArechiga/koaApp.git
```

### Install Dependencies
#### Backend
```sh
cd backend
npm install
```
#### Frontend
```sh
cd frontend
npm install
```

## Configuration
Create a `.env` file in the backend directory with the following variables:
```
MONGO_URI=mongodb://localhost:27017/your-database
PORT=4000
JWT_SECRET=your_secret_key
```

## Running the Application

### Start Backend
```sh
cd backend
npm run server
```

### Start Frontend
```sh
cd frontend
npm run dev
```

## API Endpoints
The GraphQL API is accessible at:
```
http://localhost:4000/graphql
```
You can use GraphQL Playground to test queries and mutations.

## Contributing
Feel free to fork this repository and submit pull requests with improvements.

## License
This project is licensed under the MIT License.

