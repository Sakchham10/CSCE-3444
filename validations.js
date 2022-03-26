const Joi = require('joi')

module.exports.restaurantValidations = Joi.object({
    restaurant: Joi.object({
        Name: Joi.string().required(),
        Location: Joi.string().required(),
        MostPopular: Joi.string().required(),
        EUID: Joi.number().required().min(0)
    }).required()
})
