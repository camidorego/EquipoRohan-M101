import { Router } from "./deps.ts";
import authController from "./controllers/authController.ts";

const router = new Router();

router.post("/auth/login", authController.login.bind(authController));
router.post("/auth/register", authController.register.bind(authController)); // falta implementar

export default router;
