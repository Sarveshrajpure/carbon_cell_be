const { userService } = require("../services/");
const httpStatus = require("http-status");

const userController = {
  async getUserdata(req, res, next) {
    try {
      let userData = req.authenticated;

      let userInfo = await userService.findUserById(userData.id);

      res.status(httpStatus.OK).send({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
      });
    } catch (err) {
      next(err);
    }
  },
};
module.exports = userController;
