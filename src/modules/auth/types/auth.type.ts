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

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type AuthInfo = {
  id?: number;
  email: string,
  name?: string;
  access_token: string;
  refresh_token: string;
};

export type AccessToken = {
  access_token: string;
};

export type RefreshTokens = {
  refresh_token: string;
};