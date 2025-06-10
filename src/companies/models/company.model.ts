import { Order } from './../../orders/model/order.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

    @OneToMany(() => Order, (o) => o.company)
    orders: Order[];

    @Column({ type: 'datetime', nullable: true })
    created_at?: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at?: Date;
}
