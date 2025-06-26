import { Injectable } from '@nestjs/common';
import { RegisterRequest, LoginRequest, ValidateRequest, AuthResponse, UserPayload } from '@proto/lib/auth';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  // Sekret do podpisywania tokenów — przenieś do env w realnym projekcie
  private readonly jwtSecret = 'secret123';

  async register(data: RegisterRequest): Promise<AuthResponse> {
    // W prawdziwej aplikacji: zapis do bazy + hash hasła
    const token = this.generateToken(data.username);
    return { accessToken: token };
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    // W prawdziwej aplikacji: walidacja użytkownika z bazy
    const token = this.generateToken(data.username);
    return { accessToken: token };
  }

  async validate(data: ValidateRequest): Promise<UserPayload> {
    try {
      const payload = jwt.verify(data.token, this.jwtSecret) as UserPayload;
      return { username: payload.username };
    } catch (err) {
      throw new Error('Invalid token');
    }
  }

  private generateToken(username: string): string {
    const payload: UserPayload = { username };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
  }
}
