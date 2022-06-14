export interface SensorError{
    id?: number
    sensorName: string
    placeOfSensor: string
    timeOfMeasurement: Date
    value: number
    unit: string
}