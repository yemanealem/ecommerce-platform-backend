import { ApiError } from './../../utils/ApiError';
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { BcryptService } from "../../frameworks/services/BcryptService";
import { JWTService } from "../../frameworks/services/JWTService";
import {ApiError} from "../../utils/ApiError"
interface LoginInput {
  email: string;
  password: string;
}

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private bcryptService: BcryptService,
    private jwtService: JWTService
  ) {}

  async execute(input: LoginInput): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
  throw new ApiError(401, "Invalid credentials", ["User Not exist"]);
}

    const isPasswordValid = await this.bcryptService.comparePassword(
      input.password,
      user.password
    );
    if (!isPasswordValid)   throw new ApiError(401, "Invalid credentials", ["password is not corect"]);


    const token = this.jwtService.generateToken({
      userId:(user as any).id || (user as any)._id,
      username: user.username,
      role: user.role
    });

    return { token };
  }
}
