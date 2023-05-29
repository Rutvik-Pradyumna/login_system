const express=require('express')
const router=express.Router()

const credentials = {
    email : "admin@gmail.com",
    password : "admin123"
}

// login user
router.post('/login',(req,res)=>{
    if(req.body.email==credentials.email && req.body.password==credentials.password){
        req.session.user=req.body.email
        res.redirect('/route/dashboard')
        // res.end("Login Successfull")
    }
    else{
        res.end("Invalid Username/Password")
    }
})

// dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user : req.session.user})
    }else{
        res.send("Unauthorized User")
    }
})

// logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err)
            res.send("Error")
        }
        res.render('base',{title : "Express",logout :"Logout Success"})
    })
})

module.exports = router;