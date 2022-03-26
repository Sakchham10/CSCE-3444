const express = require("express")
const router = express.Router();
const catchAsync = require('../utilties/catchAsync')
const {isLoggedIn, isAuthor, validateRestaurant} = require('../utilties/loginMiddle')
const restaurant_controllers = require('../controllers/restaurants')


router.route('/')
.get(catchAsync(restaurant_controllers.index))
.post(isLoggedIn, validateRestaurant, catchAsync(restaurant_controllers.create))

router.get('/new', isLoggedIn, restaurant_controllers.newForm)

router.route('/:id')
    .get(isLoggedIn,catchAsync(restaurant_controllers.show))
    .put(isLoggedIn, isAuthor,  validateRestaurant, catchAsync(restaurant_controllers.update))
    .delete(isLoggedIn, catchAsync(restaurant_controllers.delete))
    

router.get('/:id/edit', isLoggedIn,isAuthor,catchAsync(restaurant_controllers.editForm))

module.exports = router;