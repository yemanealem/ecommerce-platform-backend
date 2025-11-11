import jwt from 'jsonwebtoken';

export class JWTService {
  private readonly secret = process.env.JWT_SECRET || 'default_secret';
  private readonly expiresIn = '1h';

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verifyToken<T = object>(token: string): T {
    return jwt.verify(token, this.secret) as T;
  }

}
