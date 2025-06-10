import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'companies',
})
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 64 })
    name: string;

    @Column({ type: 'varchar', length: 256 })
    address: string;

    @Column({ type: 'datetime', nullable: true })
    created_at?: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at?: Date;
}
