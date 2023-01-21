const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbConnect = require('./dataBase/db');
const Image = require('./models/imageSchema');
const storage = require('./config/storage');
const fileFilter = require('./config/fileFilter');
const singleImageUploadHandler = require('./controller/singleImageUploadHandler');


// connected with database
dbConnect();

// file uploader
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5000000,//5mb
    },
});

app.get("/", async (req, res) => {
    const allData = await Image.find();
    res.status(200).json(allData)
})

app.post('/api/upload-image', upload.single('image'), singleImageUploadHandler);

// default error handler
app.use((err, req, res, next) => {
    if (err) {
        // this if block check specific multer error
        if (err instanceof multer.MulterError) {
            res.status(500).send("there was an upload error");
            console.log("multer error");
        } else {
            // this  block check default error all types
            res.status(500).json({ message: err.message });
            console.log("others error", err.message);
        }
    } else {
        res.send("success")
    }
})

app.listen(process.env.PORT, () => console.log(`app running on ${process.env.PORT}`))
