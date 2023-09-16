import Joi from "joi";

const signUpValidationSchema = Joi.object({
  userName: Joi.string().min(3).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .pattern(/^[A-Z][a-z0-9]{3,}$/),
  age: Joi.number().min(10),
  gender: Joi.string().valid("male", "female", "other"),
  phone: Joi.string().required(),
});
const signInValidationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["net", "com"] } })
    .required(),
  password: Joi.string()
    .required()
    .pattern(/^[A-Z][a-z0-9]{3,}$/),
});

export { signUpValidationSchema, signInValidationSchema };
