const User = require('../models/users')


module.exports.register = async(req,res) => {
    try{
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password)
    req.login(registeredUser,err=>{
        if(err) return next(err)
        req.flash("success", "Welcome to the APP")
        res.redirect("/restaurants")
    })
  
    }catch(e){
        req.flash("error",e.message)
        res.redirect('/register')
    }
   
}

module.exports.renderLogin =(req,res) =>{
    res.render('user/login')
}

module.exports.renderRegister = (req,res)=>{
    res.render('user/register')
}

module.exports.authenticate = (req,res)=>{
    req.flash("success","Welcome Back")
    const redirectUrl = req.session.returnTo || '/restaurants'
    res.redirect(redirectUrl)

}

module.exports.logout = (req,res)=>{
    req.logout()
    req.flash('success',"GoodBye!")
    res.redirect("/login")

}