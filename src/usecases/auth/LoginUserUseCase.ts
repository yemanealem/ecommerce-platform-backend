import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { BcryptService } from "../../frameworks/services/BcryptService";
import { JWTService } from "../../frameworks/services/JWTService";

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
    // Find user by email
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) throw new Error("Invalid credentials");

    // Compare password
    const isPasswordValid = await this.bcryptService.comparePassword(
      input.password,
      user.password
    );
    if (!isPasswordValid) throw new Error("Invalid credentials");

    // Generate JWT token
    const token = this.jwtService.generateToken({
      userId: user.id,
      username: user.username,
      role: user.role
    });

    return { token };
  }
}
