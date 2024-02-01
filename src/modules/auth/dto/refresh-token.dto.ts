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
import { IsNotEmpty } from "class-validator";

//This dto is using on both customer and instance validations
export class RefreshTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly exp: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly refreshToken: string;
}