import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { authLoginSchema, authRegisterSchema } from '../validation/user.js';
import { registerController, loginController } from '../controllers/user.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrlWrapper(registerController),
);

authRouter.post(
  "/login",
  validateBody(authLoginSchema),
  ctrlWrapper(loginController),
);


export default authRouter;

