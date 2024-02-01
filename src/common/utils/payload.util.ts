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

import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import fs = require('fs');
import CryptoJS = require("crypto-js");
import { JWT_PVT_KEY } from '../config/default.config';

/**
 * Extract payload from the token
 * Created By MayanthaJ 02 01 2024
 * Updated By Name, Date, Note
 * Version : 1
 */
export const extractPayloadFromToken = (token: string, key: string, exp = null) => {
  let newPayload = null

  if (token) {
    jwt.verify(token, key, (err, decoded: any) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          // Handle expired token error
          //return false;
          throw new UnauthorizedException();
        } else {
          // Handle other errors
          //return false
          throw new UnauthorizedException();
        }
      }

      // Refresh token expiry check
      if (exp && Date.now() >= exp * 1000) {
        return false
      }

      const pvtKey = fs.readFileSync(JWT_PVT_KEY, 'utf8');

      const decryptedData = CryptoJS.AES.decrypt(decoded.payload, pvtKey).toString(CryptoJS.enc.Utf8);
      const payload = JSON.parse(decryptedData).payload

      if (!payload) {
        return false;
      }
      newPayload = payload
      return payload
    })

    return newPayload
  }
  return false;
}
