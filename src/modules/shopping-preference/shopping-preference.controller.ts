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
 *  02 01 2024   MJ  Added interfaces to promises 
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
  Version
} from '@nestjs/common';
import { GetCurrentCustomerId } from 'src/common/decoraters/get-current-customer-id.decorater';
import { Roles } from 'src/common/decoraters/roles.decorater';
import { Role } from 'src/common/enum/role.enum';
import { AtGuard } from 'src/common/guards';
import { AddShoppingPrefDto } from './dto/add-shopping-preference.dto';
import { ShoppingPreferenceService } from './shopping-preference.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetShoppingPreferenceDto } from './dto/get-shopping-preference.dto';

@ApiTags('Shopping Preference')
@Controller('shopping-preference')
export class ShoppingPreferenceController {
  constructor(
    private readonly shoppingPreferenceService: ShoppingPreferenceService) { }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AtGuard)
  @Roles(Role.CUSTOMER)
  @Version('1')
  @Post('/')
  async addPreferenceToUser(
    @Body() addShoppingPrefData: AddShoppingPrefDto,
    @GetCurrentCustomerId() userId: number,
  ): Promise<ShoppingPrefAddResp> {
    return await this.shoppingPreferenceService.addPreferenceToUser(addShoppingPrefData, userId);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AtGuard)
  @Roles(Role.CUSTOMER)
  @Version('1')
  @Delete('/')
  async removePreferenceFromUser(
    @Body() addShoppingPrefData: AddShoppingPrefDto,
    @GetCurrentCustomerId() userId: number,
  ): Promise<ShoppingPrefRemoveResp> {
    return await this.shoppingPreferenceService.removePreferenceFromUser(addShoppingPrefData, userId);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AtGuard,)
  @Roles(Role.CUSTOMER)
  @Version('1')
  @Get('/')
  async getCompanyPpRecords(
    @GetCurrentCustomerId() userId: number,
    @Query() { skip, limit }: GetShoppingPreferenceDto
  ): Promise<ShoppingPrefListResp> {
    return await this.shoppingPreferenceService.getUsersPreferenceList(
      userId,
      Number(limit),
      Number(skip),
    );
  }

}