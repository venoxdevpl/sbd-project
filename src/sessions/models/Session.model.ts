import { User } from "./../../users/models/user.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "sessions",
})
export class Session {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 512 })
    access_token: string;

    @Column({ type: "varchar", length: 512 })
    refresh_token: string;

    @Column({ type: "boolean" })
    invalided: boolean;

    @ManyToOne(() => User, (user) => user.sessions)
    user: User;

    @Column()
    lastActivity: number;

    @Column({ type: "datetime", nullable: true })
    created_at?: Date;

    @Column({ type: "datetime", nullable: true })
    updated_at?: Date;
}
