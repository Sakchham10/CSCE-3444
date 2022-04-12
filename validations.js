const { array } = require('joi')
const Joi = require('joi')

module.exports.restaurantValidations = Joi.object({
    restaurant: Joi.object({
        Name: Joi.string().required(),
        Location: Joi.string().required(),
        MostPopular: Joi.string().required(),
        EUID: Joi.number().required().min(0)
    }).required(),
    deleteImages: Joi.array()
})


module.exports.reviewValidations = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})