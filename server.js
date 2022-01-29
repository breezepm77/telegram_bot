const express = require("express");
const app = express()
const Port = process.env.PORT || 8000
const fs = require('fs')

const multer = require('multer');
const path = require('path');
app.use(express.json())
app.use('/images', express.static('images'));

const storage = multer.diskStorage({
    destination: __dirname +  "/images/",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000000
    },

    fileFilter: function (req, file, cb) {
        return cb(null, true);
    }
}).single('myImage')

app.post('/newImg', async(req, res) => {
    upload(req, res, async(err) => {
        if(err) {
            res.send(err.messages)
        }else {
            let img = req.file.filename;
    let file = fs.readFileSync(__dirname + `/images/${img}`, "utf-8")
           console.log(file);
        }
    })
})


app.listen(Port, () => {
    console.log("server run port " + Port)
})
