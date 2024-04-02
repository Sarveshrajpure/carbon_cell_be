const { User } = require("../models/user");
const { authService, userService } = require("../services/");
const { registerSchema, loginSchema } = require("../validations/registerLoginValidations");
const httpStatus = require("http-status");
require("dotenv").config();

const authController = {
  async register(req, res, next) {
    try {
      //validating using joi
      let value = await registerSchema.validateAsync(req.body);

      if (value) {
        //chechking if email is taken
        if (await User.emailTaken(value.email)) {
          throw new ApiError(httpStatus.BAD_REQUEST, "User already exists!");
        }

        let user = await authService.createUser(
          value.email,
          value.password,
          value.firstName,
          value.lastName
        );

        res.status(httpStatus.CREATED).send({
          user,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async signin(req, res, next) {
    try {
      //validating user login data using joi
      let value = await loginSchema.validateAsync(req.body);

      if (value) {
        const user = await authService.signInEmailAndPassword(value.email, value.password);

        //setting access token
        let token = await authService.genAuthToken(user);

        res
          .cookie("x-access-token", token, {
            expires: authService.setExpiry(1),
            sameSite: "none",
            secure: true,
          })
          .status(httpStatus.OK)
          .send({
            user,
            token,
          });
      }
    } catch (error) {
      next(error);
    }
  },
  async isauth(req, res, next) {
    try {
      let auth = req.authenticated;

      let _id = auth.id;
      let user = await userService.findUserById(_id);

      if (auth && user) {
        res.status(httpStatus.OK).send(user);
      }
    } catch (err) {
      next(err);
    }
  },

  async logout(req, res, next) {
    try {
      res.clearCookie("x-access-token").send("Logged out successfully!");
    } catch (err) {
      next(err);
    }
  },
};
module.exports = authController;