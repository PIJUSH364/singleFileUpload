const fs = require('fs');
const Image = require("../models/imageSchema");

const singleImageUploadHandler = (req, res) => {
    fs.readFile("uploads/" + req.file.filename, (err, data) => {
        if (!err) {
            const image = new Image({
                name: req.body.name,
                img: {
                    data: data,
                    contentType: req.file.mimetype,
                }
            });
            image.save().then(result => {
                res.status(200).json({
                    message: "Image uploaded successfully",
                    image: result
                });
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        } else {
            res.status(500).json({
                message: "Image uploaded fail",
            });
        }
    })

}
module.exports = singleImageUploadHandler;

