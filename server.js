const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();

const PORT = 3000;
const DB_URL = 'mongodb://localhost:27017/my-brand';

// connect to mongodb

mongoose.connect(DB_URL);
const conn = mongoose.connection;

conn.once('open', () => {
    console.log('successfully connected');
})

conn.on('error', () => {
    console.log('error connecting to database');
})

// render html files

app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static(__dirname));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));

})

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname+'/login.html'));

})
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname+'/register.html'));

})

app.use('/', router);
app.listen(process.env.port || PORT);

// app.get('/', (req, res) => {
//     res.sendFile('login.html')
// });

// app.get('/', (req, res) => {
//     res.sendFile('register.html')
// });

// app.listen(PORT);



/*const posts = [{
    username: 'Bernice',
    title: 'Post 1'
}]



app.get('/login', (req, res))

app.listen(PORT)*/