import { Meal } from './../../meals/models/meal.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'categories',
})
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 32 })
    name: string;

    @OneToMany(() => Meal, (meal) => meal.category)
    meals: Meal[];

    @Column({ type: 'datetime', nullable: true })
    created_at?: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at?: Date;
}
