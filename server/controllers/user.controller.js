const { userService } = require("../services/");
const httpStatus = require("http-status");

const userController = {
  async getUserdata(req, res, next) {
    try {
      // #swagger.description = 'getuserdata is a protected route, it requires authorization token to get a response'
      let userData = req.authenticated;

      let userInfo = await userService.findUserById(userData.id);

      /* #swagger.responses[200] = {
            description: 'Reponsds with sensitive user info',
            schema:{
              "firstName": "jhon",
              "lastName": "deo",
              "email": "jhondoe@gmail.com",
               }
            
        } */

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
