const express = require('express');
const bodyParser = require("body-parser");
require('dotenv').config({ path: '.env' });
const cookieParser = require("cookie-parser");
const path = require('path');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors());
app.use( (req, res, next) => {
    
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Origin",  "*");
   
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header('Access-Control-Allow-Credentials', true);
    next();
});


const CarsRouter = require('./routes/carsRouter.js');
const PhotosRouter = require('./routes/photosRouter.js')


app.use('/api/', CarsRouter);
app.use('/api/', PhotosRouter);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "build")));


app.use("/uploads", express.static("uploads"));

app.get('/*', (req, res) =>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
