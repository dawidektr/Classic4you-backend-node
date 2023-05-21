const { upload } = require("../upload.js");

const photoController = require('../controllers/photoController.js');

const PhotosRouter = require('express').Router();


PhotosRouter.post('/photos',upload.array('photos',10),photoController.addPhotos)
PhotosRouter.get('/photos',photoController.getPhotos);
PhotosRouter.delete('/photos/:id',photoController.deletePhoto);
PhotosRouter.put('/photos/:id',photoController.updateMainPhoto)
PhotosRouter.put('/photos',photoController.updatePositions);
module.exports = PhotosRouter;


