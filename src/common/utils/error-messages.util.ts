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

/**
 * General error codes
 * Created By MayanthaJ 02 01 2024
 * Updated By Name, Date, Note
 * Version : 1
 */
export const GENERAL_ERROR_CODES = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  500: 'Internal Server Error',
};

/**
 * User auth module static texts
 * Created By MayanthaJ 02 01 2024
 * Updated By Name, Date, Note
 * Version : 1
 */
export const USER_AUTH_MODULE = {
  ERROR_MESSAGE: {
    USER_NOT_FOUND: 'User not found or OTP not valid',
    USER_NOT_FOUND2: 'User not found',
    USER_CREDS_ISSUE: 'Invalid Credentials',
    USER_AUTH_FAILED: 'Unauthorized',
    USER_EXISTS: 'User already exists!',
    USER_NOT_ACTIVE: 'Please activate your account',
  }
};

/**
 * Shopping preferences module static texts
 * Created By MayanthaJ 02 01 2024
 * Updated By Name, Date, Note
 * Version : 1
 */
export const SHOPPING_PREF_MODULE = {
  ERROR_MESSAGE: {
    SHOPPING_PREF_NA: 'Selected shopping preference is not available',
    SHOPPING_PREF_EXIST: 'Selected shopping preference is already added to your list',
    SHOPPING_PREF_NOT_EXIST: 'Selected shopping preference is not available in your list',
  },
};