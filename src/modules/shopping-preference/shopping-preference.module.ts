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

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingPreferenceController } from './shopping-preference.controller';
import { ShoppingPreference } from './shopping-preference.entity';
import { ShoppingPreferenceService } from './shopping-preference.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShoppingPreference])],
  providers: [ShoppingPreferenceService],
  exports: [ShoppingPreferenceService],
  controllers: [ShoppingPreferenceController]
})
export class ShoppingPreferenceModule { }
