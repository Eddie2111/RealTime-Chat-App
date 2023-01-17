const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'file/'});
router
    .get("/", (req, res) => {
        res.send("file route");
    })
    .post("/",upload.single('file'),(req,res)=>{
        console.log(req.file);
        res.send("File uploaded");
    })

module.exports = router;    