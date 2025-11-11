export interface IAuthService {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hashed: string): Promise<boolean>;
  generateToken(payload: object): string;
}
