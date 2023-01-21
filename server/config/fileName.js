const path = require('path');

const fileName = (req, file, cb) => {
    const fileExtName = path.extname(file.originalname);
    const uniqueName = Date.now();
    cb(null, uniqueName + fileExtName);
}

module.exports = fileName