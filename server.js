const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const dane = require('./db');
const path = require('path');




const app = express();
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// import routes
const testimonials = require('./routes/testimionals');
const concerts = require('./routes/concerts');
const seats = require('./routes/seats');


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use('/api', testimonials); 
app.use('/api', concerts); 
app.use('/api', seats); 


// [DONE]
app.use((req, res) => {
    res.status(404).send('404 not found...');
  });

  app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
  });
  