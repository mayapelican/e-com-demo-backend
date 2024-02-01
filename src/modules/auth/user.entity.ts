/**
 *
 * @project : mj-ecommerce-demo-backed
 * @createdDate : 02 01 2024
 * @author : Mayantha Jayawardena
 * -----
 * @lastModified :02 01 2024
 * @modifiedBy : Mayantha Jayawardena
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 *  02 01 2024   MJ  initial version
 */

import { IsEmail } from 'class-validator';
import { BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { ShoppingPreference } from '../shopping-preference/shopping-preference.entity';

@ApiTags('Auth')
@Entity('ecom_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  isActive: boolean;

  @Column({ nullable: false })
  dob: Date;

  @Column({ nullable: false })
  otp: Number;

  @Column({ nullable: true, type: 'text' })
  hashedRt: string;

  @Column({ nullable: true, type: 'text' })
  refreshToken: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date;
  }

  @OneToMany(() => ShoppingPreference, (shoppingPreference) => shoppingPreference.customer)
  shoppingPreference: ShoppingPreference[];
}
