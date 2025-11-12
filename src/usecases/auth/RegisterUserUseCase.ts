import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { BcryptService } from "../../frameworks/services/BcryptService";
import { User } from "../../entities/User";
import { UserRole } from "../../entities/enum/UserRole";

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private bcryptService: BcryptService
  ) {}

  async execute(input: RegisterInput): Promise<User> {
    const existingUser = await this.userRepository.findByEmailOrUsername(
      input.email,
      input.username
    );
    if (existingUser) {
      throw new Error("Email or username already exists");
    }

    const hashedPassword = await this.bcryptService.hashPassword(input.password);

    const user = new User(input.username, input.email, hashedPassword, UserRole.USER);

    await this.userRepository.create(user);

    return user;
  }
}
