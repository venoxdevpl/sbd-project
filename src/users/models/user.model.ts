import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from './../../roles/models/Role.model';
import { Session } from './../../sessions/models/Session.model';
import { Company } from './../../companies/models/company.model';
import { Order } from './../../orders/model/order.model';

@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 64 })
    name: string;

    @OneToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @OneToMany(() => Session, (session) => session.user)
    sessions: Session[];

    @ManyToMany(() => Company)
    @JoinTable({ name: 'companies_users' })
    companies: Company[];

    @OneToMany(() => Order, (o) => o.user)
    orders: Order[];

    @Column({ type: 'varchar', length: 32 })
    email: string;

    @Column({ type: 'varchar', length: 64 })
    password: string;

    @Column({ type: 'datetime', nullable: true })
    created_at?: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at?: Date;

    async setPassword(password: string) {
        this.password = await bcrypt.hash(password, 12);
    }
}
