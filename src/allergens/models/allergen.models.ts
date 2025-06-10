import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'allergens',
})
export class Allergen {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 32 })
    name: string;

    @Column({ type: 'datetime', nullable: true })
    created_at?: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at?: Date;
}
