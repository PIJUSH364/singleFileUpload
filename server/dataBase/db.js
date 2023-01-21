const mongoose = require('mongoose');

function dbConnect() {
    mongoose.set('strictQuery', false);
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vibpqrq.mongodb.net/singleImage?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("connection successful"))
        .catch((err) => console.log("connection fail", err));
}

module.exports = dbConnect;


