import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './models/Permissions.model';
import { Repository } from 'typeorm';
import { Role } from './models/Role.model';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>,
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
    ) {}

    public async seeder() {
        const permissions: { key: string; description: string }[] = [
            {
                key: '*.*',
                description: 'Uprawnienia administracyjne - ROOT.',
            },

            // Allergens
            {
                key: 'allergens.create',
                description: 'Zarządzanie alergenami - tworzenie.',
            },
            {
                key: 'allergens.read',
                description: 'Zarządzanie alergenami - podgląd.',
            },
            {
                key: 'allergens.update',
                description: 'Zarządzanie alergenami - edycja.',
            },
            {
                key: 'allergens.delete',
                description: 'Zarządzanie alergenami - usuwanie.',
            },

            // Categories
            {
                key: 'categories.create',
                description: 'Zarządzanie kategoriami - tworzenie.',
            },
            {
                key: 'categories.read',
                description: 'Zarządzanie kategoriami - podgląd.',
            },
            {
                key: 'categories.update',
                description: 'Zarządzanie kategoriami - edycja.',
            },
            {
                key: 'categories.delete',
                description: 'Zarządzanie kategoriami - usuwanie.',
            },

            // Companies
            {
                key: 'companies.create',
                description: 'Zarządzanie firmami - tworzenie.',
            },
            {
                key: 'companies.read',
                description: 'Zarządzanie firmami - podgląd.',
            },
            {
                key: 'companies.update',
                description: 'Zarządzanie firmami - edycja.',
            },
            {
                key: 'companies.delete',
                description: 'Zarządzanie firmami - usuwanie.',
            },

            // Meals
            {
                key: 'meals.create',
                description: 'Zarządzanie posiłkami - tworzenie.',
            },
            {
                key: 'meals.read',
                description: 'Zarządzanie posiłkami - podgląd.',
            },
            {
                key: 'meals.update',
                description: 'Zarządzanie posiłkami - edycja.',
            },
            {
                key: 'meals.delete',
                description: 'Zarządzanie posiłkami - usuwanie.',
            },

            // Orders
            {
                key: 'orders.create',
                description: 'Zarządzanie zamówieniami - tworzenie.',
            },
            {
                key: 'orders.read',
                description: 'Zarządzanie zamówieniami - podgląd.',
            },
            {
                key: 'orders.update',
                description: 'Zarządzanie zamówieniami - edycja.',
            },
            {
                key: 'orders.delete',
                description: 'Zarządzanie zamówieniami - usuwanie.',
            },

            // Roles
            {
                key: 'roles.create',
                description: 'Zarządzanie rolami - tworzenie.',
            },
            { key: 'roles.read', description: 'Zarządzanie rolami - podgląd.' },
            {
                key: 'roles.update',
                description: 'Zarządzanie rolami - edycja.',
            },
            {
                key: 'roles.delete',
                description: 'Zarządzanie rolami - usuwanie.',
            },

            // Sessions (tylko read i delete)
            {
                key: 'sessions.read',
                description: 'Zarządzanie sesjami - podgląd.',
            },
            {
                key: 'sessions.delete',
                description: 'Zarządzanie sesjami - usuwanie.',
            },

            // Users
            {
                key: 'users.create',
                description: 'Zarządzanie użytkownikami - tworzenie.',
            },
            {
                key: 'users.read',
                description: 'Zarządzanie użytkownikami - podgląd.',
            },
            {
                key: 'users.update',
                description: 'Zarządzanie użytkownikami - edycja.',
            },
            {
                key: 'users.delete',
                description: 'Zarządzanie użytkownikami - usuwanie.',
            },
        ];
        const perms: Permission[] = [];

        for (let i = 0; i < permissions.length; i++) {
            const perm = permissions[i];

            const model = new Permission();

            model.key = perm.key;
            model.description = perm.description;

            perms.push(await this.permissionRepository.save(model));
        }

        const rootRole = new Role();
        rootRole.name = 'Administrator';
        rootRole.permissions = [];
        rootRole.permissions.push(perms.find((v) => v.key == '*.*')!);
        await this.roleRepository.save(rootRole);
    }
}
