import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AppService } from '../app/app.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AppService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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
      const isValid = await this.authService.validate(token);
      if (!isValid) {
        throw new ForbiddenException('Invalid token');
      }
      return true;
    } catch (err) {
      // Możesz logować błąd, jeśli chcesz
      throw new ForbiddenException('Token validation failed');
    }
  }
}
