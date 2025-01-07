import { AdminUser } from "src/admin-user/admin-user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @ManyToMany(() => AdminUser, user => user.roles)
  users: AdminUser[]
}