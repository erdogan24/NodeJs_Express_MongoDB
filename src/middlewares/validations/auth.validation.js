const joi = require("joi");
const APIError = require("../../utils/errors");

class authValidation {
  constructor() {}
  static register = async (req, res, next) => {
    try {
      await joi
        .object({
          name: joi.string().trim().min(3).max(100).required().messages({
            "string.base": "namespace must be text",
            "string.empty": "namespace cannot be empty",
            "string.min": "namespace must be 3 character at least",
            "string.max": "namespace must be 10 character at most",
            "string.required": "namespace must be",
          }),
          lastName: joi.string().trim().min(3).max(100).required().messages({
            "string.base": "Surnamespace must be text",
            "string.empty": "Surnamespace cannot be empty",
            "string.min": "Surnamespace must be 3 character at least",
            "string.max": "Surnamespace must be 10 character at most",
            "string.required": "namespace must be",
          }),
          email: joi
            .string()
            .email()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
              "string.base": "Email must be text",
              "string.empty": "Email cannot be empty",
              "string.min": "Email must be 3 character at least",
              "string.email": "Please sign in your email",
              "string.max": "Email must be 10 character at most",
              "string.required": "Emailmust be",
            }),
          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "Password must be text",
            "string.empty": "Password cannot be empty",
            "string.min": "password must be 6 character at least",
            "string.max": "Password must be 36 character at most",
            "string.required": "Password must be",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      if (error.details && error?.detail[0].message)
        throw new APIError(error.detail[0].message, 400);
      else throw new APIError("please follow the validation rules", 400);
    }
    next();
  };

  static login = async (req, res, next) => {
    try {
    } catch (error) {
      if (error.details && error?.detail[0].message)
        throw new APIError(error.detail[0].message, 400);
      else throw new APIError("please follow the validation rules", 400);
    }
  };
}

module.exports = authValidation;
