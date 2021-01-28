const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const dane = require('./../db');

// [DONE]
router.route('/testimonials').get((req, res) => {
    res.send(dane.db.testimonials)
});

//[DONE]
router.route('/testimonials/:id').get((req, res, next) => {
    const id = req.params.id;
    let finded = dane.db.testimonials.find(element => element.id == id);
    res.json(finded)
        next(); 
    }
);

//[DONNE]
router.route('/testimonials/random').get((req, res) => {
    const generateRandomId = dane.db.testimonials[Math.floor(Math.random() * dane.db.testimonials.length)];
    res.json(generateRandomId);
});

// [DONE]
router.route('/testimonials').post((req, res) => {
    const consumer = req.body;
    consumer.id = uuidv4();
    dane.db.testimonials.push(consumer);
    res.send('Customer: '+ consumer.author + ' ' +'is added to the database with id number: ' + consumer.id);

});

// [DONE]
router.route('/testimonials/:id').put((req, res) => {
    const id = req.params.id;
    const newCustomer = req.body;
    dane.db.testimonials.filter(i => {
        if(i.id == id){
            i.author = newCustomer.author;
            i.text = newCustomer.text;
        }
    })
    res.json(dane.db.testimonials)
});

// [DONE]
router.route('/testimonials/:id').delete((req, res) => {
    const id = req.params.id;
    dane.db.testimonials.filter(i => {
        if(i.id == id){
            let itemToDelete = dane.db.testimonials.indexOf(i);
            dane.db.testimonials.splice(itemToDelete, 1);
        }
    })
    res.json('ok')
});

module.exports = router;
