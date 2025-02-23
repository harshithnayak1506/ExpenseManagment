const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express();
app.use(express.json())
app.use(cors())
const userModel=require('./models/Expense')
mongoose.connect("mongodb://127.0.0.1:27017/AllExpenses")

app.post('/login',(req,res) => {
    const {email,password} = req.body;
    userModel.findOne({email : email})
    .then(user => {
        if(user) {
            if(user.password == password) {
                res.json('Successful Login')
            }else {
                res.json('Email/password is incorrect')
            }
        }else {
            res.json('No record found!!!')
        }
    })
})

app.post('/register',(req,res) => {
    console.log("Recieved data : ",req.body);
    userModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.listen(3007, () => {
    console.log("MongoDB is connected")
})