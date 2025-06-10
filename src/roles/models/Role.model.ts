import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./Permissions.model";

@Entity({
    name: "roles",
})
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 32 })
    name: string;

    @ManyToMany(() => Permission, {
        eager: true,
    })
    @JoinTable({ name: "roles_permissions" })
    permissions: Permission[];

    @Column({ type: "datetime", nullable: true })
    created_at?: Date;

    @Column({ type: "datetime", nullable: true })
    updated_at?: Date;
}
