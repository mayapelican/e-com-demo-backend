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

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import fs = require('fs');
import CryptoJS = require("crypto-js");
import { JWT_PVT_KEY } from '../config/default.config';


/**
 * Get customer id from the token
 * Created By MayanthaJ 02 01 2024
 * Updated By Name, Date, Note
 * Version : 1
 */
export const GetCurrentCustomerId = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const key = fs.readFileSync(JWT_PVT_KEY, 'utf8');

    const decryptedData = CryptoJS.AES.decrypt(request.user.payload, key).toString(CryptoJS.enc.Utf8);
    const payload = JSON.parse(decryptedData).payload

    if (!payload.id) {
      return false;
    }
    return payload.id;
  },
);
