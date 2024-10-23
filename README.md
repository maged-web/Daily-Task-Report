# Daily-Task-Report
Create a "Daily Tasks Report" feature for managing employee tasks with CRUD operations, enforcing a maximum of 8 hours per task and daily. Use React TypeScript and Redux for the frontend, and Node.js and Express for the backend, with client and server-side validation. Deliver a single-page application with a README and well-documented code.




Step-by-Step Instructions

Clone the Repository: Run the following commands in your terminal: git clone https://github.com/maged-web/Daily-Task-Report.git

cd Daily-Task-Report

Setup Backend: Navigate to the backend directory and install the dependencies: cd backend npm install Create a .env file in the backend folder and add the necessary environment variables. The .env file should contain:

MONGO_URL=your_mongodb_atlas_uri
PORT=5000

To start the backend server, run:

npm run run:dev

The backend server will now be running on http://localhost:5000.

Setup Frontend Navigate to the frontend directory:

cd ../frontend

Install the frontend dependencies:

npm install

Create a .env file in the frontend folder with the necessary environment variables. The .env file should look like this:

VITE_API_BASE_URL=http://localhost:5000

To start the frontend, run:

npm run dev

The frontend server will now be running on http://localhost:5173/.

MongoDB Atlas Setup Make sure that you have a MongoDB Atlas cluster set up. You'll need to:

Create a database in MongoDB Atlas. Add your MongoDB URI in the backend .env file under MONGO_URL. Ensure the database is accessible (whitelist your IP in Atlas if needed).

Running the Application Once both the frontend and backend are set up and running:

Open two terminal windows.

In one terminal, navigate to the backend folder and run the backend server (npm run run:dev). In the other terminal, navigate to the frontend folder and run the frontend server (npm run dev). Access the application at http://localhost:5173/ in your web browser.