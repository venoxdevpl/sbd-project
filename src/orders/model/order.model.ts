import { User } from './../../users/models/user.model';
import { OrderContent } from './content.model';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './../../companies/models/company.model';

@Entity({
    name: 'orders',
})
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (u) => u.orders)
    user: User;

    @ManyToOne(() => Company, (c) => c.orders)
    company: Company;

    @OneToMany(() => OrderContent, (oc) => oc.order)
    contents: OrderContent[];

    @Column({ type: 'datetime', nullable: true })
    created_at?: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at?: Date;
}
