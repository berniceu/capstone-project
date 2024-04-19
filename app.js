const express = require('express');
const mongoose = require('mongoose');
const Blogs = require('./models/blogsModel');
const userData = require('./models/userData');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer( {storage: storage});

//middleware
app.use(express.json());
app.use(cors());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'my brand api',
            version: '1.0.0'
        },
        servers: [{
            url: 'http://localhost:000'
        }]
    },

    apis:['./app.js']
}

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))



//routes
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})

/**
 * @swagger
 * components: 
 *   schemas:
 *     blogs:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: unique identifier of the blog
 *         blogTitle:
 *           type: string
 *           description: title of the blog
 *         blog:
 *           type: string
 *           description: content of the blog
 *         author: 
 *           type: string
 *           description: author of the blog
 */



/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: fetch data from mongodb
 *     description: This api is used to get all blogs from mongodb
 *     responses:
 *       '200':
 *         description: Get data from mongodb
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/blogs'
 */
app.get('/blogs', async (req, res) => {
    try{

        const blogs = await Blogs.find({});
        // res.render('blogs', { blogs })
        res.status(200).json(blogs);

    } catch(err) {
        console.log(err.message)
    }
})


/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: post blogs to mongodb
 *     description: this api is used to post blogs to mongodb
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/blogs'
 *     responses:
 *       '200':
 *         description: blog added successfully.
 */
app.post('/blogs',upload.single('image'), async (req, res) => {

    try{
        

        if (!req.file){
            return res.status(400).json({error: 'No file uploaded'});
        }

       const result = await cloudinary.uploader.upload(req.file.path);
       const { blogTitle, blog, author } = req.body;
       console.log(author)
       const blogData = new Blogs({
        blogTitle,
        blog,
        blogImage: result.secure_url,
        author
       })

       const newBlog = await blogData.save();
       fs.unlinkSync(req.file.path);
       res.status(200).json(newBlog)
         
        

    } catch (err) {
        console.log(err.message)
    }
    
})

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: fetch blog from mongodb using id
 *     description: This api is used to get a blog from mongodb using its id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID required
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Get blog from mongodb
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/blogs'
 */
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
/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: update blog in mongodb using id
 *     description: This api is used to update a blog in mongodb using its id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID required
 *         schema: 
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/blogs'                 
 *     responses:
 *       '200':
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/blogs'
 */
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
/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: delete blog from mongodb using id
 *     description: This api is used to delete blog from mongodb using its id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID required
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: blog deleted successfully

 */

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
/**
 * @swagger
 * components: 
 *   schemas:
 *     users:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: name of user
 *         email:
 *           type: string
 *           description: email of user
 *         password: 
 *           type: string
 *           description: password
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: save user to mongodb
 *     description: this api is used to save users to mongodb
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       '200':
 *         description: user added successfully
 */
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
/**
 * @swagger
 * /login:
 *   post:
 *     summary: user login
 *     description: this api is used to log users if they exist in mongodb
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: user logged in successfully.
 */

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



const PORT = process.env.port || 5000;

app.listen(PORT, () => {
    console.log('Node app running on port 5000')
})

mongoose.connect('mongodb://localhost:27017')
.then(() => {
    console.log('connected to mongodb')
}).catch((err) => {
    console.log(err)
})