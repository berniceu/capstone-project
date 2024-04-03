const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Blogs = require('./models/blogsModel');
const userData = require('./models/userData');
const jwt = require('jsonwebtoken');




//middleware
app.use(express.json())


//routes
app.get('/', (req, res) => {
    res.send('hello world');
})

app.get('/blogs', async (req, res) => {
    try{

        const blogs = await Blogs.find({});
        res.status(200).json(blogs);

    } catch(err) {
        console.log(err.message)
    }
})

app.post('/blogs', async (req, res) => {

    try{
        const blog = await Blogs.create(req.body)
        res.status(200).json(blog)
         

    } catch (err) {
        console.log(err.message)
    }
    
})

app.get('/blogs/:id', async(req, res) => {
    try {
        const { id } = req.params
        const blog = await Blogs.findById(id);
        res.status(200).json(blog)
    } catch(err){
        console.log(err.message)
    }
})

// update blog
app.put('/blogs/:id', async(req, res) => {
    try{
        const { id } = req.params;
        const blog = await Blogs.findByIdAndUpdate(id, req.body);

        const updatedBlog = await Blogs.findById(id);
        res.status(200).json(updatedBlog)
        

    } catch(err){
        console.log(err.message)
    }
})


// delete blog

app.delete('/blogs/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blogs.findByIdAndDelete(id);
        res.status(200).json(blog)
    } catch(err){
        console.log(err);
    }
})

// create user
app.post('/signup', async (req, res) => {
    const data = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
    }

    const existingUser = await userData.findOne({fullName: data.fullName});

    if(existingUser){
        res.send('User already exists')
    } else {
        const userInfo = await userData.insertMany(data)
    }

    
})


// login

app.post('/login', async (req, res) => {

    try{
        const { email, password } = req.params;

        const user = await userData.findOne({email:req.body.email});

        if(!user){
            res.send("User cannot be found")
        }

        if(!req.body.password === user.password){
            res.send("Incorrect password")
        }
    } catch(err){
        console.log(err)
    }
    


})



app.listen(5000, () => {
    console.log('Node app running on port 5000')
})

mongoose.connect('mongodb://localhost:27017')
.then(() => {
    console.log('connected to mongodb')
}).catch((err) => {
    console.log(err)
})