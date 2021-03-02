const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const dane = require('./db');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const aws = require('aws-sdk');
const helmet = require('helmet');




const app = express();
app.use(cors());
app.use(helmet());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// import routes
const testimonials = require('./routes/testimionals');
const concerts = require('./routes/concerts');
const seats = require('./routes/seats');

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonials); 
app.use('/api', concerts); 
app.use('/api', seats); 


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// [DONE]
app.use((req, res) => {
  res.status(404).send('404 not found...');
});

// connects our backend code with the database
(process.env.NODE_ENV === 'production')
? mongoose.connect(`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.z6bd2.mongodb.net/NewWaveFestival?retryWrites=true&w=majority`)
: mongoose.connect('mongodb://localhost:27017/NewWaveDB', { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;


const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));


io.on('connection', (socket) =>{
  console.log('new socket: ' + socket.id);
  socket.on('disconnect', ()=> console.log('disconected '+ socket.id));
})