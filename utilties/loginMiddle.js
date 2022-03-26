const{restaurantValidations} = require('../validations');
const restaurant = require('../models/restaurant')
const ExpressError = require('../utilties/ExpressError')

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error','You must be signed in first!')
        return res.redirect('/login')
    }
    next()
}

module.exports.isAuthor = async(req,res,next)=>{
    const {id} = req.params;
    const single_restaurant = await restaurant.findById(id);
    if(!single_restaurant.Author.equals(req.user._id)){
        req.flash('error','Sorry you do not have the permission')
        return res.redirect(`/restaurants/${single_restaurant._id}`)
    }
    next()
}

module.exports.validateRestaurant = (req, res, next) => {
    const { error } = restaurantValidations.validate(req.body)
    console.log(error)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else {
        next()
    }
}