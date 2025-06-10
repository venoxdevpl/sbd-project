import { Allergen } from 'src/allergens/models/allergen.models';
import { Category } from 'src/categories/model/category.model';
import { OrderContent } from 'src/orders/model/content.model';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
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

    @ManyToOne(() => Category, (c) => c.meals)
    category: Category;

    @ManyToMany(() => Allergen)
    @JoinTable({ name: 'meals_allergens' })
    allergens: Allergen[];

    @OneToMany(() => OrderContent, (o) => o.meal)
    orderContent: OrderContent[];

    @Column({ type: 'varchar', length: 1024 })
    description: string;

    @Column({ type: 'datetime', nullable: true })
    created_at?: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at?: Date;
}
