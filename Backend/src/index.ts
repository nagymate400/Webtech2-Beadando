import { connectionOptions } from "./ormconfig"
import express = require("express");
import { createConnection } from "typeorm";
import 'reflect-metadata';
import bodyParser =  require("body-parser")
var cors = require('cors');


const app = express();

app.use(bodyParser.json());
const sensorRecordRouter = require("./Router/SensorRecord.router")
const sensorRouter = require("./Router/Sensor.router")
const sensorErrorRouter = require("./Router/SensorError.router")
const userRouter = require("./Router/User.router")

//CORS
app.use(cors());

createConnection(connectionOptions).then(async (connection) => {
    app.listen(3000,()  => console.log("Port: 3000"));
    console.log("Connected to DB!");
    
}).catch((error) => console.log(error));

app.use('/api/user', userRouter);
app.use("/api/sensor", sensorRouter);
app.use("/api/sensorRecord", sensorRecordRouter);
app.use("/api/sensorError", sensorErrorRouter);

