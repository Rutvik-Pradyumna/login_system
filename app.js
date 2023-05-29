const express=require('express')
const app=express()
const path=require('path')
const bodyparser=require('body-parser')
const session=require('express-session')
const {v4:uuidv4}=require('uuid')
const port=process.env.PORT || 3000

const router=require('./router')

app.set('view engine','ejs')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended : true}))

// load static assets
app.use('/static',express.static(path.join(__dirname,'public')))

app.use(session({
    secret : uuidv4(), // generates a secret random string(id)
    resave : false,
    saveUninitialized : true
}))

app.use('/route',router)

//home route
app.get('/',(req,res)=>{
    res.render('base',{title:"Login System"})
})

app.listen(port,()=>{console.log("http://localhost:3000");})