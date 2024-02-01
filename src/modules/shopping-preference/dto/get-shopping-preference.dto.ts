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

export class GetShoppingPreferenceDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly limit: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly skip: number;
}
