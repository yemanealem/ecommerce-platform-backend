import { v4 as uuidv4 } from 'uuid';
import { UserRole } from './enums';

export class User {
  id: string;
  username: string;
  email: string;
  password: string; // hashed password
  role: UserRole;

  constructor(username: string, email: string, password: string, role: UserRole = UserRole.USER) {
    this.id = uuidv4();
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
