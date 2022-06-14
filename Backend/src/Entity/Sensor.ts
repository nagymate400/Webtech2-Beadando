import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Sensor {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name: string

    @Column()
    placeOfMeasurment: string

    @Column()
    unit: string

    @Column()
    active: boolean
}