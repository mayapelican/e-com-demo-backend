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
 *  02 01 2024   MJ  Error handling added
 * 
 */

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddShoppingPrefDto } from './dto/add-shopping-preference.dto';
import { ShoppingPreference } from './shopping-preference.entity';
import { ShoppingPreferences } from 'src/common/static/shopping-preferences.static';
import { exceptionHandler } from 'src/common/utils/shared.util';
import { SHOPPING_PREF_MODULE } from 'src/common/utils/error-messages.util';
import { User } from '../auth/user.entity';

@Injectable()
export class ShoppingPreferenceService {
  constructor(
    @InjectRepository(ShoppingPreference)
    private readonly shoppingPreferenceService: Repository<ShoppingPreference>,
  ) { }

  async addPreferenceToUser(addShoppingPrefData: AddShoppingPrefDto, customerId: number): Promise<ShoppingPrefAddResp> {
    // check preference is exist in the list
    let prefAvailability = ShoppingPreferences.find((rec: ShoppingPreferenceInterface) => rec.id == addShoppingPrefData.prefId);
    if (!prefAvailability)
      exceptionHandler(HttpStatus.BAD_REQUEST, [
        `${SHOPPING_PREF_MODULE.ERROR_MESSAGE.SHOPPING_PREF_NA}`,
      ]);

    // find user already added the selected shopping preference
    const checkPrefOnUser = await this.shoppingPreferenceService.findOne({ where: { shoppingPrefItemId: addShoppingPrefData.prefId, customer: { id: customerId } } });
    if (checkPrefOnUser)
      exceptionHandler(HttpStatus.BAD_REQUEST, [
        `${SHOPPING_PREF_MODULE.ERROR_MESSAGE.SHOPPING_PREF_EXIST}`,
      ]);

    try {
      let shoppingPreference = new ShoppingPreference();
      shoppingPreference.customerId = customerId;
      shoppingPreference.shoppingPrefItemId = addShoppingPrefData.prefId;

      return await this.shoppingPreferenceService.save(shoppingPreference);
    } catch (error) {
      console.error(error);
      exceptionHandler(HttpStatus.BAD_REQUEST, [
        `${SHOPPING_PREF_MODULE.ERROR_MESSAGE.ACTIVITY_FAILED}`,
      ], error);
    }
  }

  async getUsersPreferenceList(
    customerId: number,
    limit: number,
    skip: number,
  ): Promise<ShoppingPrefListResp> {
    try {
      const query = this.shoppingPreferenceService
        .createQueryBuilder('ecom_shopping_preference')
        .innerJoinAndMapOne(
          'ecom_shopping_preference.user',
          User,
          'ecom_user',
          'ecom_shopping_preference.customerId = ecom_user.id',
        )
        .select([
          'ecom_shopping_preference.id',
          'ecom_shopping_preference.shoppingPrefItemId',
        ])
        .where('ecom_shopping_preference.customerId = :customerId', { customerId });

      query.orderBy('ecom_shopping_preference.id', 'DESC');
      const recordsAll = await query.getMany();
      query.take(limit);
      query.skip(skip * limit);

      const records = await query.getMany();

      const mappedPreferences = await this.mapPreferences(records, ShoppingPreferences);

      return {
        pagination: {
          total: recordsAll.length,
          count: records.length,
          limit,
          skip,
        },
        results: mappedPreferences,
      };
    } catch (error) {
      console.error(error);
      exceptionHandler(HttpStatus.BAD_REQUEST, [
        `${SHOPPING_PREF_MODULE.ERROR_MESSAGE.ACTIVITY_FAILED}`,
      ], error);
    }
  }

  async mapPreferences(preferences: ShoppingPreferenceList[], shoppingPrefs: ShoppingPreferenceInterface[]) {
    return preferences.map(pref => {
      const foundPref = shoppingPrefs.find(shoppingPref => shoppingPref.id === pref.shoppingPrefItemId);
      return {
        ...pref,
        preferenceName: foundPref ? foundPref.name : undefined
      };
    });
  };

  async removePreferenceFromUser(addShoppingPrefData: AddShoppingPrefDto, customerId: number): Promise<any> {
    // check preference is exist in the list
    let prefAvailability = ShoppingPreferences.find((rec: ShoppingPreferenceInterface) => rec.id == addShoppingPrefData.prefId);
    if (!prefAvailability)
      exceptionHandler(HttpStatus.BAD_REQUEST, [
        `${SHOPPING_PREF_MODULE.ERROR_MESSAGE.SHOPPING_PREF_NA}`,
      ]);

    // find user already added the selected shopping preference
    const checkPrefOnUser = await this.shoppingPreferenceService.findOne({ where: { shoppingPrefItemId: addShoppingPrefData.prefId, customer: { id: customerId } } });
    if (!checkPrefOnUser)
      exceptionHandler(HttpStatus.BAD_REQUEST, [
        `${SHOPPING_PREF_MODULE.ERROR_MESSAGE.SHOPPING_PREF_NOT_EXIST}`,
      ]);

    try {
      return await this.shoppingPreferenceService.delete(addShoppingPrefData.prefId);
    } catch (error) {
      console.error(error);
      exceptionHandler(HttpStatus.BAD_REQUEST, [
        `${SHOPPING_PREF_MODULE.ERROR_MESSAGE.ACTIVITY_FAILED}`,
      ], error);
    }
  }

}
