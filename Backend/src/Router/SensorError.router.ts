import express = require("express");
import { getRepository, Repository } from "typeorm";
import { SensorError } from "../Entity/SensorError";


const router = express.Router();

router.post("", (req, res) => {
    console.log(req.body);
    const repository = getRepository(SensorError);
    const sensorEntitiy = repository.create({ 
        sensorName: req.body.sensorName, 
        placeOfSensor: req.body.placeOfSensor,
        unit: req.body.unit, 
        value: req.body.value, 
    });
    repository.save(sensorEntitiy).then((result) => {
        res.status(201).json({
            message: "Sensor created",
            result: result
        });
    }).catch((error) => {
        res.status(500).json({
            error: error,
            message: "Something went wrong! :/"
        });
    })
});

router.get("/:id", async (req, res) => {
    const repository = getRepository(SensorError);
    try {
        const entity = await repository.findOneBy({id: parseInt(req.params.id)})
        if(!entity){
            return res.status(404).json({message : "Entity not found"})
        }
        return res.status(200).json({sensor : entity});
        
    } catch (error) {
        console.error(error);
    }
})


router.get('', (req, res, next) => {
    const repository = getRepository(SensorError);
    repository.find().then((result) => {
        console.log(result)
      return res.status(200).json({
        message: 'Elementes fetched succesfull',
        elements: result,
      });
    });
  });

router.delete('/delete/:id', async (req, res, next) => {
    console.log('Delete has started with this id:' + req.body.id);
    const repository = getRepository(SensorError);
    try {
      const id = req.params.id;
      const entity = await repository.findOneBy({id: parseInt(req.params.id)});
      if (!entity) {
        return res.status(404).json({ message: 'Entity not founded' });
      }
      await repository.delete(entity);
      res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
    }
  });
module.exports = router;