import { Application, Context, Router, send } from "../deps.ts";
import { renderFile } from "https://deno.land/x/dejs/mod.ts";
import cfg from "../cfg.json" assert { type: "json" };
import { signupUser } from "./controllers/signupController.ts";
import { loginUser, logoutUser } from "./controllers/loginController.ts";
import { getUserProfile } from "./controllers/userController.ts";
const { cwd } = Deno;

export async function start() {
  const router = new Router();
  router
    .get("/", (ctx) => ctx.response.redirect("./login"))
    .post("/signup", (ctx) => signupUser(ctx))
    .post("/login", (ctx) => loginUser(ctx))
    .get("/logout", (ctx) => logoutUser(ctx))
    .get("/userProfile", (ctx) => getUserProfile(ctx))
    .get("/css/styles.css", async (ctx) => {
      await send(ctx, "/css/styles.css", {
        root: `${cwd()}`,
      });
    })
    .get("/(.*\..*)", (ctx) => sendFile(ctx, { siteName: cfg.siteName }));

  const app = new Application();
  app.use(router.routes());
  app.use(router.allowedMethods());

  console.log(`Server started on ${cfg.serverPort}`);
  await app.listen({ port: cfg.serverPort });
}

async function sendFile(ctx: Context, data: any) {
  const fileName = ctx.request.url.pathname.split(".")[0] + ".ejs";
  const file = await renderFile(`${cwd()}/templates${fileName}`, data);
  ctx.response.body = file;
  ctx.response.headers.set("Content-Type", "text/html");
}
