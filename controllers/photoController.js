const fs = require("fs");
const { sequelize, photo } = require('../models');
const db = require('../models');

const Car = db.car;
const Photo = db.photo;


    const addPhotos = async(req,res) =>
{
    const sql = JSON.parse(req.body.sql);
    let photo = await Photo.bulkCreate(sql);

    

    if(photo)
    {
        res.status(200).send(photo);
    }
    else
    {
        res.status(400).send('No data')
    }

}

const getPhotos = async (req,res) =>
{
    const photos = await Photo.findAll({order: ['main']});
    if(photos) res.status(200).send(photos);
    else res.status(400).send('No data');
}

const deletePhoto = async (req,res)=>
{
    const id = req.params.id;
    await Photo.destroy({ where: { id } });
    res.status(204).send('Photo is deleted !');
}


const updateMainPhoto = async (req,res) =>
{
    const id =  parseInt(req.params.id);
    const carId = await Photo.findOne({where:{id:id}});
    const oldMain = await Photo.findOne({where:{carId:carId.carId,main:1}});
    await Photo.update({main:0},{where:{carId:carId.carId,main:1}});
    await Photo.update({main:1},{where:{id:id}});
    const photo = await Photo.findAll({where:{id:[id,oldMain.id]}});
    res.status(201).send(photo);
}


const updatePositions = async (req,res) =>
{
    const data = req.body;
     const photos =  await Photo.bulkCreate(
        data,
        {
          updateOnDuplicate: ["position"],
        }
      );
    
      res.status(201).send(photos);
}





module.exports = {
    addPhotos, 
    getPhotos,
    deletePhoto,
    updateMainPhoto,
    updatePositions
};
