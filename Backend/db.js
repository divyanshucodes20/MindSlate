const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MONGO");
    } catch (error) {
        console.error("Error connecting to MONGO:", error);
    }
};

module.exports = connectToMongo;