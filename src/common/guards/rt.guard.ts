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

import { AuthGuard } from '@nestjs/passport';

/**
 * Refresh token guard
 * Created By MayanthaJ 02 01 2024
 * Updated By Name, Date, Note
 * Version : 1
 */
export class RtGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
