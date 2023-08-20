import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from '../dto/user.dto';
import { ROLES_KEY } from '../../../common/decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    if (requiredRoles.some((role) => user.role?.includes(role))) {
      return true;
    }

    throw new UnauthorizedException(
      `User with roles ${user.role} does not have access to this route with roles ${requiredRoles}`,
    );
  }
}
