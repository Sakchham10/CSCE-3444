const restaurant = require('../models/restaurant')

module.exports.index = (async (req, res) => {
    const allRestaurants = await restaurant.find({})
    res.render('restaurants/index', { allRestaurants })
})

module.exports.newForm = (req,res)=>{
    res.render('restaurants/new')
}

module.exports.create = (async (req, res) => {
    const new_restaurant = new restaurant(req.body.restaurant)
    new_restaurant.Images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    new_restaurant.Author = req.user._id
    await new_restaurant.save();
    req.flash('success', 'Successfully made a new restaurant')
    res.redirect(`/restaurants/${new_restaurant._id}`)
})

module.exports.show = async (req, res) => { 
    const { id } = req.params
    const single_restaurant = await restaurant.findById(id).populate('Author').populate('reviews')
    if (!single_restaurant) {
        req.flash('error', 'The restaurant does not exist anymore')
        return res.redirect('/restaurants')
    }
    res.render('restaurants/show', { single_restaurant})
}

module.exports.editForm = async (req, res) => {
    const {id} = req.params
    const single_restaurant = await restaurant.findById(id)
    if(!single_restaurant){
        req.flash('error','The restaurant does not exist anymore')
        return res.redirect('/restaurants')
    }
    res.render('restaurants/edit', { single_restaurant })
}

module.exports.update = async (req, res) => {
    const { id } = req.params
    const new_restaurant= await restaurant.findByIdAndUpdate(id, { ...req.body.restaurant })
    req.flash('success', 'Successfully updated the restaurant')
    res.redirect(`/restaurants/${new_restaurant._id}`)
}

module.exports.delete = async (req, res) => {
    const { id } = req.params
    await restaurant.findByIdAndDelete(id)
    res.redirect('/restaurants')
}