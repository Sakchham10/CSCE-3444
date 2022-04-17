const mongoose = require('mongoose');
const cities = require('./cities');
const {food, last, descriptors } = require('./seedHelpers');
const Restaurant = require('../models/restaurant');

mongoose.connect('mongodb://localhost:27017/csce-project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Restaurant.deleteMany({});
    for (let i = 0; i < 33; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Restaurant({
            //YOUR USER ID
            Author: '6258c24d9790a82c4104b336',
            Location: `${cities[random1000].city}, ${cities[random1000].state}`,
            Name: `${sample(descriptors)} ${sample(last)}`,
            MostPopular: `${sample(food)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})