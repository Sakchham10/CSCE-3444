const{restaurantValidations,reviewValidations} = require('../validations');
const restaurant = require('../models/restaurant')
const ExpressError = require('../utilties/ExpressError')
const Review = require('../models/reviews')

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
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else {
        next()
    }
}

module.exports.isReviewAuthor = async(req,res,next)=>{
    const { id, reviewID } = req.params;
    const review = await Review.findById(reviewID)
    if(!review.author.equals(req.user._id)){
        req.flash('error','You do not have permission to do that!')
        return res.redirect(`/restaurants/${id}`)
    }
    next();
}

module.exports.validateReviews = (req,res,next)=>{
    const { error } = reviewValidations.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else {
        next()
    }
}
