const Joi = require("@hapi/joi");

const getAnimalFactSchema = Joi.object({
  animal_type: Joi.string().max(50).required("Type of animal required!"),
  amount: Joi.number().max(500).required("Amount of facts to be retrived is required!"),
});

module.exports = {
  getAnimalFactSchema,
};
