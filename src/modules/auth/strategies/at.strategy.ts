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

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH_KEY_LABEL } from 'src/common/config/default.config';

type jwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: AUTH_KEY_LABEL,
    });
  }

  async validate(payload: jwtPayload) {
    return payload;
  }
}
