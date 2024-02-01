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


import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AUTH_EXP,
  AUTH_KEY_LABEL,
  JWT_PVT_KEY,
  REF_EXP,
  REF_KEY_LABEL
} from 'src/common/config/default.config';
import { Role } from 'src/common/enum/role.enum';
import {
  USER_AUTH_MODULE
} from 'src/common/utils/error-messages.util';
import { exceptionHandler } from 'src/common/utils/shared.util';
import { Repository } from 'typeorm';
import { Tokens } from './types/index';
import { User } from './user.entity';
import fs = require('fs');
import CryptoJS = require("crypto-js");
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CustomerRegDto } from './dto/customer-reg.dto';
import { CustomerLoginDto } from './dto/customer-login.dto';
import { CustomerValidationDto } from './dto/customer-validation.dto';
import { generateOTP } from 'src/utils/common.utils';
import * as bcrypt from 'bcrypt';
import * as argon2 from "argon2";
import { extractPayloadFromToken } from 'src/common/utils/payload.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userService: Repository<User>,
    private jwtService: JwtService
  ) {

  }

  async registration(customerRegData: CustomerRegDto): Promise<any> {
    const { name, email, dateOfBirth, password } = customerRegData;

    // check uniqueness of the email
    let user = await this.userService.findOne({
      where: { email: email },
    });
    if (user)
      exceptionHandler(HttpStatus.BAD_REQUEST, [
        `${USER_AUTH_MODULE.ERROR_MESSAGE.USER_EXISTS}`,
      ]);

    let newOtp = generateOTP(6);

    let newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.dob = dateOfBirth;
    newUser.password = await argon2.hash(password);
    newUser.isActive = false;
    newUser.otp = newOtp;

    // TODO: need to send a email with the generated OTP

    return await this.userService.save(newUser);
  }

  // TODO: need to implement a new api endpoint and function to re-request the OTP

  async login(customerLoginData: CustomerLoginDto): Promise<any> {
    let user: User = await this.userService.findOne({
      where: { email: customerLoginData.email },
    });

    if (!user)
      exceptionHandler(HttpStatus.BAD_REQUEST, [
        `${USER_AUTH_MODULE.ERROR_MESSAGE.USER_NOT_FOUND2}`,
      ]);

    if (! await argon2.verify(user.password, customerLoginData.password))
      exceptionHandler(HttpStatus.BAD_REQUEST, [
        `${USER_AUTH_MODULE.ERROR_MESSAGE.USER_AUTH_FAILED}`,
      ]);


    if (!user.isActive)
      exceptionHandler(HttpStatus.BAD_REQUEST, [
        `${USER_AUTH_MODULE.ERROR_MESSAGE.USER_NOT_ACTIVE}`,
      ]);

    return this.generateAuthToken(user);
  }

  async validation(customerValidationData: CustomerValidationDto): Promise<any> {

    // check email with otp
    let user = new User();
    user = await this.userService.findOne({
      where: { email: customerValidationData.email, otp: customerValidationData.otp },
    });

    if (!user)
      exceptionHandler(HttpStatus.BAD_REQUEST, [
        `${USER_AUTH_MODULE.ERROR_MESSAGE.USER_NOT_FOUND}`,
      ]);

    user.isActive = true;
    user.otp = 0;

    return await this.userService.save(user);
  }

  async generateAuthToken(user: User) {
    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.name,
    );

    await this.storeRefreshToken(Role.CUSTOMER, user.id, tokens.refresh_token);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      ...tokens,
    };
  }

  async getTokens(
    id: number,
    email: string,
    name: string,
  ): Promise<Tokens> {
    const key = fs.readFileSync(JWT_PVT_KEY, 'utf8');
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify({ payload: { id, email, name, role: Role.CUSTOMER } }), key).toString();

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          payload: encryptedData
        },
        {
          secret: AUTH_KEY_LABEL,
          expiresIn: AUTH_EXP,
        },
      ),

      this.jwtService.signAsync(
        {
          payload: encryptedData
        },
        {
          secret: REF_KEY_LABEL,
          expiresIn: REF_EXP,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async storeRefreshToken(type: Role, userId: number, rt: string) {
    // User type CUSTOMER
    if (type === Role.CUSTOMER) {
      const user = await this.userService.findOne({ where: { id: userId } });

      user.hashedRt = rt ? await this.hashData(rt) : rt;
      user.refreshToken = rt;
      return await this.userService.save(user);
    }
    //other user types can be handled here
  }

  async refreshToken(userId: number, refreshTokenData: RefreshTokenDto): Promise<Tokens> {

    const payload = extractPayloadFromToken(refreshTokenData.refreshToken, REF_KEY_LABEL, refreshTokenData.exp)
    if (payload.sub !== userId) {
      exceptionHandler(HttpStatus.BAD_REQUEST, [
        `${USER_AUTH_MODULE.ERROR_MESSAGE.USER_NOT_FOUND}`,
      ]);
    }

    const user = await this.userService.findOne({
      where: { id: userId },
    });
    if (!user)
      exceptionHandler(HttpStatus.UNAUTHORIZED, [
        `${USER_AUTH_MODULE.ERROR_MESSAGE.USER_AUTH_FAILED}`,
      ]);

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.name
    );

    this.storeRefreshToken(Role.CUSTOMER, user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: number) {
  }

  async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
}
