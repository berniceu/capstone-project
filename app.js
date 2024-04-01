const express = require('express');
const mongoose = require('mongoose');
const app = express();
const blogs = require('./models/blogsModel');



//middleware
app.use(express.json())


//routes
app.get('/', (req, res) => {
    res.send('hello world');
})

app.post('/blog', async (req, res) => {

    try{
        const blog = await blogs.create(req.body)
        res.status(200).json(blog)
         

    } catch (err) {
        console.log(err.message)
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