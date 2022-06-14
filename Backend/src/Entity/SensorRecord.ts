import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, ManyToOne, Timestamp, CreateDateColumn } from "typeorm"
import { Sensor } from "./Sensor"

@Entity()
export class SensorRecord {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    value: number

    @CreateDateColumn()
    timeOfMeasurement: Date

    @ManyToOne(() => Sensor,(sensor : Sensor) => sensor.id)
    sensorid: number

}
