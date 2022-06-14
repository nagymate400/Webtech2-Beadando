import { ConnectionOptions } from 'typeorm';

const connectionOptions: ConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'Sensor_records',
    synchronize: true,
    logging: true,
   

    entities: [
       'src/Entity//*.ts'
    ],
    migrations: [
       'src/migration//.ts'
    ],
    subscribers: [
       'src/subscriber/**/.ts'
    ],
 };

export { connectionOptions };
