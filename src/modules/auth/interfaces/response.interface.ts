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
 * User registration response interface
 * Created By MayanthaJ 02 01 2024
 * Updated By Name, Date, Note
 * Version : 1
 */
interface UserRegResp {
    id: number;
    name: string;
    email: string;
    dob: string; // Assuming dob is a date in string format, e.g., "YYYY-MM-DD"
    isActive: boolean;
    otp: number;
}

/**
 * User login response interface
 * Created By MayanthaJ 02 01 2024
 * Updated By Name, Date, Note
 * Version : 1
 */
interface UserPayload {
    id: number;
    email: string;
    name: string;
    access_token: string;
    refresh_token: string;
}
