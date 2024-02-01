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

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decoraters/roles.decorater';
import { Role } from '../enum/role.enum';
import { AUTH_KEY_LABEL } from '../config/default.config';
import { extractPayloadFromToken } from '../utils/payload.util';

/**
 * User role guard
 * Created By MayanthaJ 02 01 2024
 * Updated By Name, Date, Note
 * Version : 1
 */
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();

        const userRole = await extractPayloadFromToken(request.headers.authorization?.split(' ')[1], AUTH_KEY_LABEL);
        if (!userRole) {
            return false;
        }
        return requiredRoles.some((role) => userRole.role?.includes(role));

    }
}