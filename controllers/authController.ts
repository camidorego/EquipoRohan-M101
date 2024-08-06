import { RouterContext } from "../deps.ts";
import authService from "../services/authService.ts";

class AuthController {
  async login(ctx: RouterContext) {
    const { username, password } = await ctx.request.body({ type: "json" }).value;
    const token = await authService.login(username, password);
    if (token) {
      ctx.response.status = 200;
      ctx.response.body = { token };
    } else {
      ctx.response.status = 401;
      ctx.response.body = { message: "Invalid username or password" };
    }
  }

  async register(ctx: RouterContext) {
    const { username, password } = await ctx.request.body({ type: "json" }).value;
    await authService.register(username, password);
    ctx.response.status = 201;
    ctx.response.body = { message: "User created successfully" };
  }
}

export default new AuthController();
