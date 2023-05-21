const multer = require("multer");
const fs = require("fs");
const db = require("./models");


const storage = multer.diskStorage({
    destination: (req, _file, cb) => {
        const { name } = req.body;
        const path = `./uploads/${name}`;
        fs.mkdirSync(path, { recursive: true });
        return cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const deleteFolder = async  (req,res,next) =>{
    const {id} = req.params;
    
    const car = await db.car.findOne(
        { where: { id },
        attributes: ['name'] });
   
    const path = `./uploads/${car.name}`;
    fs.rmSync(path, { recursive: true });
    next();
}

 const upload = multer({storage});
    
module.exports = {
    deleteFolder,
    upload
};
