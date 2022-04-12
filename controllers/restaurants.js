const restaurant = require('../models/restaurant')
const geocoding = require("@mapbox/mapbox-sdk/services/geocoding")
const mapbox_token = process.env.MAPBOX_TOKEN
const {cloudinary} = require('../cloudinary')

const geocoder = geocoding({accessToken: mapbox_token})

module.exports.index = (async (req, res) => {
    const allRestaurants = await restaurant.find({})
    res.render('restaurants/index', { allRestaurants })
})

module.exports.newForm = (req,res)=>{
    res.render('restaurants/new')
}

module.exports.create = (async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.restaurant.Location, 
        limit: 2
    }).send()
    const new_restaurant = new restaurant(req.body.restaurant)
    new_restaurant.geometry = geoData.body.features[0].geometry
    new_restaurant.Images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    new_restaurant.Author = req.user._id
    await new_restaurant.save();
    req.flash('success', 'Successfully made a new restaurant')
    res.redirect(`/restaurants/${new_restaurant._id}`)
})

module.exports.show = async (req, res) => { 
    const { id } = req.params
    const single_restaurant = await restaurant.findById(id).populate('Author').populate({
        path:'reviews',
        populate:{
            path:'author'
        }})
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
    console.log(req.body.deleteImages)
    const new_restaurant= await restaurant.findByIdAndUpdate(id, { ...req.body.restaurant })
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
    new_restaurant.Images.push(...imgs)
    await new_restaurant.save()
    console.log(new_restaurant.Images)
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename)
        }
        await new_restaurant.updateOne({$pull: { Images: { filename: { $in: req.body.deleteImages}}}})
    }
    req.flash('success', 'Successfully updated the restaurant')
    res.redirect(`/restaurants/${new_restaurant._id}`)
}

module.exports.delete = async (req, res) => {
    const { id } = req.params
    await restaurant.findByIdAndDelete(id)
    res.redirect('/restaurants')
}