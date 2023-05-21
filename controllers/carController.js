const { QueryTypes,Op } = require('sequelize');
const { sequelize } = require('../models');
const db = require('../models');


const Car = db.car;
const Photo = db.photo;



const getCar = async (_req,res,id) => {
    const car = await sequelize.query(
    `SELECT cars.id,name,description,links,path,cars.position FROM cars JOIN photos WHERE cars.id = photos.carId AND main=1 AND cars.id=${id}`,
    { type: QueryTypes.SELECT });

    res.status(201).send(car);
};


const addCar =  async (req, res) => {
    
    let info = {
        name: req.body.name,
        description: req.body.description,
        links: req.body.links,
        position:-1
    };
    
    const car = await Car.create(info);

    if(car) 
    {
        await Photo.create({
            carId:car.id,
            path:`${car.name}/${req.body.fileName}`,
            main:1,
            position:0
        });
    }

   
    await Car.increment('position',{by:1,where:{id:{
        [Op.gt]: -1
    }}});
        
   

    
    getCar(req,res,car.id);

    
};

const getCars = async (_req, res) => {
    const cars = await sequelize.query(
    "SELECT cars.id,name,description,links,path,cars.position FROM cars JOIN photos WHERE cars.id = photos.carId AND main=1 order by cars.position",
    { type: QueryTypes.SELECT });

    res.status(200).send(cars);
};



const updateCar = async (req, res) => {
    let id = req.params.id;

    // const position = parseInt(req.body.position);

    await Car.update(req.body, { where: { id: id } });

    getCar(req,res,id);
};

const deleteCar = async (req, res) => {
    let id = req.params.id;

    const carPosition = await Car.findOne({where:{id}})

    await Car.decrement('position',{by:1,where:{position:{
        [Op.gt]: carPosition.position,
    }}})
     await Car.destroy({ where: { id: id } });
    res.status(204).end()
};

const updateCarsPosition = async (req,res) =>
{
    const data = req.body;
     const cars =  await Car.bulkCreate(
        data,
        {
          updateOnDuplicate: ["position"],
        }
      );
    
      res.status(201).send(cars);
}


module.exports = {
    addCar,
    getCars,
    updateCar,
    deleteCar,
    updateCarsPosition
};
