const { deleteFolder,  upload } = require("../upload.js");
const carController = require('../controllers/carController.js');

const CarsRouter = require('express').Router();

CarsRouter.post('/cars',upload.single('file'), carController.addCar);
CarsRouter.get('/cars', carController.getCars);
CarsRouter.put('/cars/:id', carController.updateCar);
CarsRouter.delete('/cars/:id',deleteFolder, carController.deleteCar);
CarsRouter.put('/cars',carController.updateCarsPosition);

module.exports = CarsRouter;


