import { Router, Request, Response } from 'express';
import { LoginUserUseCase } from '../../../usecases/auth/LoginUserUseCase';
import { RegisterUserUseCase } from '../../../usecases/auth/RegisterUserUseCase';
import { UserRepositoryImpl } from '../../repositories/UserRepositoryImpl';
import { BcryptService } from '../../services/BcryptService';
import { JWTService } from '../../services/JWTService';
import { validateLoginInput, validateRegisterInput } from '../../../utils/Validation';
import { ResponseFormatter } from '../../../utils/BasicResponseFormatter';

const router = Router();

const userRepository = new UserRepositoryImpl();
const bcryptService = new BcryptService();
const jwtService = new JWTService();

const loginUserUseCase = new LoginUserUseCase(userRepository, bcryptService, jwtService);
const registerUserUseCase = new RegisterUserUseCase(userRepository, bcryptService);

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const errors = validateLoginInput(email, password);

    if (errors.length > 0) {
      return res.status(400).json(ResponseFormatter.error('Validation error', errors));
    }

    const { token } = await loginUserUseCase.execute({ email, password });
    const user = await userRepository.findByEmail(email);

    return res.status(200).json(ResponseFormatter.success('Login successful', {
      token,
      user: {
        userId: user?.id,
        username: user?.username,
        role: user?.role,
      },
    }));
  } catch (err: any) {
    return res.status(401).json(ResponseFormatter.error('Invalid credentials', [err.message]));
  }
});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const errors = validateRegisterInput(username, email, password);

    if (errors.length > 0) {
      return res.status(400).json(ResponseFormatter.error('Validation error', errors));
    }

    const user = await registerUserUseCase.execute({ username, email, password });

    return res.status(201).json(ResponseFormatter.success('Registration successful', {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    }));
  } catch (err: any) {
    return res.status(400).json(ResponseFormatter.error('Registration failed', [err.message]));
  }
});

export default router;
