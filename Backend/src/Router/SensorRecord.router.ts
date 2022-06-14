import express = require("express");
import { getRepository, Repository } from "typeorm";
import { SensorRecord } from "../Entity/SensorRecord";


const router = express.Router();
let recordList: Array<SensorRecord> = [];

router.post("", (req, res) => {
    console.log(req.body);
    const repository = getRepository(SensorRecord);
    const sensorRecord = repository.create({ value: req.body.value, sensorid: req.body.sensorId});
    if(req.body.id === null){
        recordList.push(sensorRecord);
        res.status(201).json({
            message: "Sensor record created",
            result: sensorRecord
        });
    } else {
        recordList.forEach(element =>{
            repository.save(element).then(() => {
                recordList = [];
            }).catch((error) => {
                res.status(500).json({
                    error: error,
                    message: "Something went wrong! :/"
                });
            })
        })
    }
    
});

router.get("/:id", async (req, res) => {
    const repository = getRepository(SensorRecord);
    try {
        const entity = await repository.findOneBy({id: parseInt(req.params.id)})
        if(!entity){
            return res.status(404).json({message : "Entity not found"})
        }
        return res.status(200).json({SensorRecord : entity});
        
    } catch (error) {
        console.error(error);
    }
})

router.get("/sensor/:id", async (req, res) => {
    const repository = getRepository(SensorRecord);
    try {
        const entity = await repository.find( {where : {sensorid: parseInt(req.params.id)} })
        if(!entity){
            return res.status(404).json({message : "Entity not found"})
        }
        return res.status(200).json({SensorRecord : entity});
        
    } catch (error) {
        console.error(error);
    }
})


router.delete('/delete/:id', async (req, res, next) => {
    console.log('Delete has started with this id:' + req.body.id);
    const repository = getRepository(SensorRecord);
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