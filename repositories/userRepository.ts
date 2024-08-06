import { User } from "../models/user.ts";

class UserRepository {
  async findByUsername(username: string) {
    return await User.where("username", username).first();
  }

  async createUser(username: string, password: string) {
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
    return user;
  }
}

export default new UserRepository();
