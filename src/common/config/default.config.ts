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

export const AUTH_KEY_LABEL = 'EcomDemoSecretAccessKeyLabelId@83234#';
export const REF_KEY_LABEL = 'EcomDemoSecretKeyLabel20@345#';
export const AUTH_EXP = 60 * 15;
export const REF_EXP = 60 * 60 * 24 * 7;
export const JWT_PVT_KEY = process.env.JWT_PVT_KEY || 'src/keys/private.key';