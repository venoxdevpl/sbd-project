import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'meals',
})
export class Meal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 64 })
    name: string;

    @Column({ type: 'varchar', length: 1024 })
    description: string;

    @Column({ type: 'datetime', nullable: true })
    created_at?: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at?: Date;
}
