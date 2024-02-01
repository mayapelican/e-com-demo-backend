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
 * Generate random number
 * Created By MayanthaJ 02 01 2024
 * Updated By Name, Date, Note
 * Version : 1
 */
export const generateOTP = (length: number) => {
    var digits = '123456789'; 
    let OTP = '';
    for (let i = 0; i < length; i++ ) { 
        OTP += digits[Math.floor(Math.random() * (9 - 0) + 0)];
    } 

    return parseInt(OTP); 
  };