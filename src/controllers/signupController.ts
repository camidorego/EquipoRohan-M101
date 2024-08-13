import { Context } from "../../deps.ts";
import { attemptSignup } from "../services/signupService.ts"; // Asegúrate de que esta función esté correctamente importada

export async function signupUser(ctx: Context) {
  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Request body is required." };
    return;
  }

  let req;
  try {
    req = await ctx.request.body.json();
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid JSON body." };
    return;
  }

  if (!(req.name && req.email && req.password)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing required fields: name, email, and password." };
    return;
  }

  try {
    await attemptSignup(req);
    ctx.response.status = 201;
    ctx.response.body = { message: "User created successfully." };
  } catch (e) {
    if (e instanceof Deno.errors.AlreadyExists) {
      ctx.response.status = 409; // Conflict
      ctx.response.body = { error: "User already exists." };
    } else {
      ctx.response.status = 500;
      ctx.response.body = { error: "Internal Server Error." };
    }
  }
}
