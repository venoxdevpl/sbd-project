import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/models/Role';
import { Session } from 'src/sessions/models/Session';

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
