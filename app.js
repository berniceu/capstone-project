const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Blogs = require('./models/blogsModel');



//middleware
app.use(express.json())


//routes
app.get('/', (req, res) => {
    res.send('hello world');
})

app.get('/blog', async (req, res) => {
    try{

        const blogs = await Blogs.find({});
        res.status(200).json(blogs);

    } catch(err) {
        console.log(err.message)
    }
})

app.post('/blog', async (req, res) => {

    try{
        const blog = await Blogs.create(req.body)
        res.status(200).json(blog)
         

    } catch (err) {
        console.log(err.message)
    }
    
})

app.get('/blog/:id', async(req, res) => {
    try {
        const { id } = req.params
        const blog = await Blogs.findById(id);
        res.status(200).json(blog)
    } catch(err){
        console.log(err.message)
    }
})

// update blog
app.put('/blog/:id', async(req, res) => {
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

app.delete('/blog/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blogs.findByIdAndDelete(id);
        res.status(200).json(blog)
    } catch(err){
        console.log(err);
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