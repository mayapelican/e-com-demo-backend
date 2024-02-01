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
 * User shopping pref add response interface
 * Created By MayanthaJ 02 01 2024
 * Updated By Name, Date, Note
 * Version : 1
 */
interface ShoppingPrefAddResp {
    customerId: number;
    shoppingPrefItemId: number;
    id: number;
}

/**
 * User shopping pref remove response interface
 * Created By MayanthaJ 02 01 2024
 * Updated By Name, Date, Note
 * Version : 1
 */
interface ShoppingPrefRemoveResp {
    raw: any;
    affected: number | null;
}

/**
 * User shopping pref list response interface
 * Created By MayanthaJ 02 01 2024
 * Updated By Name, Date, Note
 * Version : 1
 */
interface ShoppingPrefListResp {
    pagination: Pagination;
    results: ResultItem[];
}

interface Pagination {
    total: number;
    count: number;
    limit: number;
    skip: number;
}

interface ResultItem {
    id: number;
    shoppingPrefItemId: number;
    preferenceName: string;
}