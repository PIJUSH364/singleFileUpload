const mongoose = require('mongoose');

// Create a new Mongoose model for the uploaded image
const Schema = mongoose.Schema;
const ImageSchema = new Schema({
    name: String,
    img: {
        contentType: String,
        data: Buffer,
    },
});

const Image = mongoose.model('Image', ImageSchema);
module.exports = Image;  