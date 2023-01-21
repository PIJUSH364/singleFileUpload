const multer = require('multer');
const path = require('path');
const fileName = require('./fileName');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: fileName
});

module.exports = storage;