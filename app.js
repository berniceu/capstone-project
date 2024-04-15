const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Blogs = require('./models/blogsModel');
const userData = require('./models/userData');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const path = require('path');

const cors = require('cors');

app.use(cors())


//middleware
app.use(express.json())




//routes
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})
app.get('/blogs', async (req, res) => {
    try{

        const blogs = await Blogs.find({});
        // res.render('blogs', { blogs })
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

app.post('/signup', async(req, res) => {
    try{
        const newUser = new userData(req.body);
        newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
        const existingUser = await userData.findOne({email: newUser.email})

        if (existingUser){
            return res.status(400).json({message: "User already exists"})
        } else{
            const savedUser = await newUser.save();
            res.status(200).json(savedUser);
        }
    } catch(err){
        console.log(err)
    }
    


})  

// login

app.post('/login', async(req, res) => {
    try{

        const { email, password } = req.body;
        const user = await userData.findOne({ email });

        if (!user){
            return res.status(404).json({message: "User not found"});

        }

        if (!bcrypt.compareSync(password, user.hash_password)){
            return res.status(401).json({message: "Incorrect password"});
        }

        const accessToken = jwt.sign({ email: user.email}, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({ message: "Logged In Successfully" });

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