const express = require('express');
const app = express();
const mongoose = require('mongoose');
PORT = 5500;

DB_URL = 'mongodb://localhost:27017/my-brand';

// connect to mongodb

mongoose.connect(DB_URL);
const conn = mongoose.connection;

conn.once('open', () => {
    console.log('successfully connected');
})

conn.on('error', () => {
    console.log('error connecting to database');
})


/*const posts = [{
    username: 'Bernice',
    title: 'Post 1'
}]

app.get('/posts', (req, res) => {
    res.json(posts)
})

app.get('/login', (req, res))

app.listen(PORT)*/