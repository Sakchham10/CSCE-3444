const mongoose = require('mongoose')
const res = require('express/lib/response');
const Restaurant = require('../models/restaurant')

mongoose.connect('mongodb://localhost:27017/csce-project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database Connected")
})

restaurants = ['BurgerKing', 'McDonalds', 'Chick-fil-A', 'TacoBell', 'Whataburger', 'Mamas Fish House','Halls Chophouse']
foodItems = ['Chicken Sandwich','French Fries','Fish Fillet','Chicken Tacos','CheeseBurger','IceCream','BurritoBowl','Fried Chicken','Steak']
const seedDB = async()=>{
    await Restaurant.deleteMany({});
    for (let i = 0; i < 7; i++) {
        val = Math.floor(Math.random() * 9)
        id = Math.floor(Math.random()*100 +3)
        const single_restaurant = new Restaurant({ Name: restaurants[i], Location: 'MainCampus', MostPopular: foodItems[val], EUID: id, Author: '623c92ce7b88fb0a9980eb24'});
        await single_restaurant.save();
    }
    
}

const addRestaurant = async()=>{
    await Restaurant.updateMany()
}

seedDB().then(()=>
    mongoose.connection.close()
)