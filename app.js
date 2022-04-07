if (process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const express = require('express');
const path = require('path');
const session = require('express-session')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const ExpressError = require('./utilties/ExpressError')
const flash = require('connect-flash')
const passport = require('passport');
const passportLocal = require('passport-local')
const User = require('./models/users')
const reivew = require('./models/reviews')


const restaurantRoutes = require("./routes/restaurants")
const userRoutes = require("./routes/auth")
const reviewRoutes = require("./routes/reviews");
const reviews = require('./models/reviews');

mongoose.connect('mongodb://localhost:27017/csce-project',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"))
db.once("open",()=>{
    console.log("Database Connected")
})

const app = express();

app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
const sessionConfig = {
    secret: "thisisabadsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})


app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static("public"))


app.use("/restaurants", restaurantRoutes)
app.use("/", userRoutes)
app.use("/restaurants/:id/reviews",reviewRoutes)

app.get('/',(req,res)=>{
    res.render('home')
})

app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found',404))
})

app.use((err,req,res,next)=>{
    const { statusCode = 500 } = err
    if(!err.message){
        err.message = " Oh No! Something Went Wrong"
    }
    res.status(statusCode).render('errors',{err})
})

app.listen(3000,()=>{
    console.log('Serving on port 3000')
})
