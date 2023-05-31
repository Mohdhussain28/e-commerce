const app = require("./app")
const dotenv = require("dotenv")
const connectDatabase = require("./config/database")

// Handle Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
});

//Config
dotenv.config({ path: "backend/config/config.env" });

// Connecting to databsae
connectDatabase()

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

// Unhandled promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise rejectionaa`);

    server.close(() => {
        process.exit(1);
    });
});