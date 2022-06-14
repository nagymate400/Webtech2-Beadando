import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"

@Entity()
export class SensorError {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    sensorName: string

    @Column()
    placeOfSensor: string

    @CreateDateColumn()
    timeOfMeasurement: Date

    @Column()
    value: number

    @Column()
    unit: string

}