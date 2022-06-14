import { Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;
}