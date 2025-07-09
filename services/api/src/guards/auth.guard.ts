import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiService } from '../api/api.service';
import { IS_PUBLIC_KEY } from './auth.public';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly apiService: ApiService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'] || request.headers['Authorization'];
    if (!authHeader) {
      throw new ForbiddenException('Authorization header missing');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      throw new ForbiddenException('Invalid authorization header format');
    }

    const [type, token] = parts;
    if (type !== 'Bearer' || !token) {
      throw new ForbiddenException('Invalid authorization header format');
    }

    try {
      const user = await this.apiService.getUserFromToken(token);
      if (!user?.id) {
        throw new ForbiddenException('Invalid token');
      }

      request.user = user; 
      return true;
    } catch (err) {
      throw new ForbiddenException('Token validation failed');
    }
  }
}
