const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const path = require('path');

dotenv.config();

// initialize server
const app = express();
app.use(express.json());

// CORS MANAGEMENT
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Boundary');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// CONNECTION TO DB 
mongoose.connect(process.env.MONGO, 
{   
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
    .then(() => console.log('connexion a mongo réussie'))
    .catch((err)=> console.log('connexion a mongo echouée'));

// ALL ROUTES 
app.use('/api/user', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.post('/api/test', (req, res) => {
    console.log('test')
    console.log(req.file)
    console.log(req.files)
} );

module.exports = app;