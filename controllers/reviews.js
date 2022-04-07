const restaurant = require('../models/restaurant')
const Review = require('../models/reviews')

module.exports.createReview = async (req, res) => {
    const single_restaurant = await restaurant.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    single_restaurant.reviews.push(review);
    await review.save();
    await single_restaurant.save();
    req.flash('success','Reivew Posted!')
    res.redirect(`/restaurants/${single_restaurant._id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewID } = req.params;
    console.log(id)
    await restaurant.findByIdAndUpdate(id, { $pull: { reviews: reviewID } });
    await Review.findByIdAndDelete(reviewID);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/restaurants/${id}`)
}