const httpStatus = require("http-status");
const { getAnimalFactSchema } = require("../validations/animaldataValidations");
const axios = require("axios");

const animalDataController = {
  async getAnimalFacts(req, res, next) {
    try {
      //  #swagger.parameters['animal_type'] = { description: 'Type of animal eg:- dog or cat',type:"string" }
      //  #swagger.parameters['amount'] = { description: 'Amount of records to be fetched',type:"number" }
      let values = await getAnimalFactSchema.validateAsync(req.params);

      let response = await axios.get(
        `https://cat-fact.herokuapp.com/facts/random?animal_type=${values.animal_type}&amount=${values.amount}`
      );

      /* #swagger.responses[200] = {
            description: 'Reponsds with array of objects containing animal facts ',
            schema: [{
                id:"1",
                text:"fact 1",
                type:"cat",
            }]
    } */

      res.status(httpStatus.OK).send(response.data);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = animalDataController;
