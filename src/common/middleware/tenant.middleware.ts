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


import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * Tenant middleware to restrict the access to specific domains
 * Created By MayanthaJ 02 01 2024
 * Updated By Name, Date, Note
 * Version : 1
 */
@Injectable()
export class TenantMiddleware implements NestMiddleware {
    constructor() { }

    async use(req: Request, res: Response, next: NextFunction) {
        const origin = req.headers.origin;
        const referer = req.headers.referer;
        
        const allowDomains = [  
            'http://localhost:3000',
            'http://localhost:3001',
        ];
        if (origin) {
            if (allowDomains.includes(origin)) {
                next();
                return true;
            } 
            throw new ForbiddenException('Redirect has been blocked by CORS policy')
        } else if(referer.includes('/api')){
            next();
            return true;
        }
        next();
        throw new ForbiddenException('Redirect has been blocked by CORS policy')
       
    }
}