import Joi from 'joi';
export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const authRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

// export const requestResetEmailSchema = Joi.object({
//   email: Joi.string().pattern(emailRegexp).required(),
// });

// export const resetPasswordSchema = Joi.object({
//   password: Joi.string().required(),
//   token: Joi.string().required(),
// });
