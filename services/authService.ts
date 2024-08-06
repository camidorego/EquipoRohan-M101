import { hash, compare } from "../deps.ts";
import { create, getNumericDate } from "../deps.ts";
import userRepository from "../repositories/userRepository.ts";

class AuthService {
  async login(username: string, password: string) {
    const user = await userRepository.findByUsername(username);
    if (user && await compare(password, user.password)) {
      const jwt = await create({ alg: "HS512", typ: "JWT" }, { username: user.username, exp: getNumericDate(60 * 60) }, Deno.env.get("JWT_SECRET")!);
      return jwt;
    }
    return null;
  }

  async register(username: string, password: string) {
    const hashedPassword = await hash(password);
    return await userRepository.createUser(username, hashedPassword);
  }
}

export default new AuthService();
