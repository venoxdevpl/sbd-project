import {
    Entity,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.model';
import { Meal } from 'src/meals/models/meal.model';

@Entity({
    name: 'orders_contents',
})
export class OrderContent {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (o) => o.contents)
    order: Order;

    @ManyToOne(() => Meal, (m) => m.orderContent)
    meal: Meal;
}
