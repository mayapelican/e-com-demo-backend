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


import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, Matches } from "class-validator";

export class CustomerRegDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/, {message: 'your password need to fulfill these requirements, At least one uppercase letter,At least one lowercase letter,At least one digit,At least one special character,A minimum length, often 8 characters'})
  password: string;

}
