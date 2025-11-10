import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { User } from "../../entities/User";
import { UserModel } from "../db/models/UserModel";

export class MongoUserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const created = await UserModel.create(user);
    return created.toObject() as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    return user ? (user.toObject() as User) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await UserModel.findOne({ username });
    return user ? (user.toObject() as User) : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    return user ? (user.toObject() as User) : null;
  }
async findByEmailOrUsername(email: string, username: string): Promise<User | null> {
  const user = await UserModel.findOne({ $or: [{ email }, { username }] });
  return user ? (user.toObject() as User) : null;
}

}
