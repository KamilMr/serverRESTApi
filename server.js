const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const dane = require('./db');




const app = express();
app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import routes
const testimonials = require('./routes/testimionals');
const concerts = require('./routes/concerts');
const seats = require('./routes/seats');

app.use('/api', testimonials); // add post routes to server
app.use('/api', concerts); // add post routes to server
app.use('/api', seats); // add post routes to server


// [DONE]
app.use((req, res) => {
    res.status(404).send('404 not found...');
  });

app.listen(8000, () => {
    console.log('Server is running on port 8000');
})