const app = require('./app');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const connectDatabase = require('./config/database');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors())

// Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error :${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})
//config
dotenv.config();


//connect to database
connectDatabase();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});
const server = app.listen(PORT, () => {
    console.log(`App is running on PORT: ${PORT}`);
})

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error :${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
})