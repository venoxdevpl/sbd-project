import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'permissions',
})
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 32 })
    key: string;

    @Column({ type: 'varchar', length: 256 })
    description: string;

    @Column({ type: 'datetime', nullable: true })
    created_at?: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at?: Date;
}
