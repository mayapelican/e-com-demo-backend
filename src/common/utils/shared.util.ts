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

import { HttpException, HttpStatus } from '@nestjs/common';
import { GENERAL_ERROR_CODES } from './error-messages.util';

/**
 * Exception handler
 * Created By MayanthaJ 02 01 2024
 * Updated By Name, Date, Note
 * Version : 1
 */
export const exceptionHandler = (statusCode: HttpStatus, message: any) => {
  throw new HttpException(
    {
      statusCode: statusCode,
      error: GENERAL_ERROR_CODES[statusCode],
      message,
    },
    statusCode,
  );
};
