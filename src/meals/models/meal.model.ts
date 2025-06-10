import { Allergen } from 'src/allergens/models/allergen.models';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
    name: 'meals',
})
export class Meal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 64 })
    name: string;

    @ManyToMany(() => Allergen)
    @JoinTable({ name: 'meals_allergens' })
    allergens: Allergen[];

    @Column({ type: 'varchar', length: 1024 })
    description: string;

    @Column({ type: 'datetime', nullable: true })
    created_at?: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at?: Date;
}
