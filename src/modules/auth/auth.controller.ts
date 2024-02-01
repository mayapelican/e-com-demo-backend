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

import { Body, Controller, Post, UseGuards, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentCustomerId, GetCurrentCustomer } from 'src/common/decoraters';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Tokens } from './types';
import { AtGuard, RtGuard } from 'src/common/guards';
import { CustomerRegDto } from './dto/customer-reg.dto';
import { CustomerLoginDto } from './dto/customer-login.dto';
import { CustomerValidationDto } from './dto/customer-validation.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  //Ecom Customer Auth

  @Version('1')
  @Post('register')
  registration(
    @Body() customerRegData: CustomerRegDto
  ): Promise<any> {

    return this.authService.registration(customerRegData);
  }

  @Version('1')
  @Post('login')
  login(
    @Body() customerLoginData: CustomerLoginDto
  ): Promise<any> {
    return this.authService.login(customerLoginData);
  }

  @Version('1')
  @Post('validation')
  validation(
    @Body() customerValidationData: CustomerValidationDto
  ): Promise<any> {
    return this.authService.validation(customerValidationData);
  }

  @UseGuards(RtGuard)
  @Version('1')
  @Post('refresh')
  refreshTokens(
    @GetCurrentCustomerId() userId: number,
    @GetCurrentCustomer('refreshToken') refreshTokenData: RefreshTokenDto,
  ): Promise<Tokens> {
    return this.authService.refreshToken(userId, refreshTokenData);
  }

  @UseGuards(AtGuard)
  @Version('1')
  @Post('logout')
  logout(@GetCurrentCustomerId() userId: number) {
    return '`logout`Endpoint is working';
  }
}
