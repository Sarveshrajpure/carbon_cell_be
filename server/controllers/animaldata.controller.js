const httpStatus = require("http-status");
const { getAnimalFactSchema } = require("../validations/animaldataValidations");
const axios = require("axios");

const animalDataController = {
  async getAnimalFacts(req, res, next) {
    try {
      let values = await getAnimalFactSchema.validateAsync(req.params);

      let response = await axios.get(
        `https://cat-fact.herokuapp.com/facts/random?animal_type=${values.animal_type}&amount=${values.amount}`
      );

      res.status(httpStatus.OK).send(response.data);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = animalDataController;
