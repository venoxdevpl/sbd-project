import { Allergen } from "./../../allergens/models/allergen.models";
import { Category } from "./../../categories/model/category.model";
import { OrderContent } from "./../../orders/model/content.model";
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
    name: "meals",
})
export class Meal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 128 })
    name: string;

    @Column({ type: "varchar", length: 1024 })
    description: string;

    @ManyToOne(() => Category, (c) => c.meals)
    category: Category;

    @ManyToMany(() => Allergen)
    @JoinTable({ name: "meals_allergens" })
    allergens: Allergen[];

    @OneToMany(() => OrderContent, (o) => o.meal)
    orderContent: OrderContent[];

    @Column({ type: "datetime", nullable: true })
    created_at?: Date;

    @Column({ type: "datetime", nullable: true })
    updated_at?: Date;
}
