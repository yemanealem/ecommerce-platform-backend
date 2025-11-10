import { User } from "../../entities/User";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByEmailOrUsername(email: string, username: string): Promise<User | null>; 

}
