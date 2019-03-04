import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    description: string;

    @Column({ length: 500 })
    email: string;

    @Column()
    status: number;
}
