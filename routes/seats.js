const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const dane = require('./../db');

// [DONE]
router.route('/seats').get((req, res) => {
    res.send(dane.db.seats)
});

//[DONE]
router.route('/seats/:id').get((req, res, next) => {
    const id = req.params.id;
    for(let x in dane.db.seats){
        if(id == dane.db.seats[x].id){
            res.json(dane.db.seats[x]);
        }
        // next();
    }
});

// [DONE]
router.route('/seats').post((req, res) => {
    const consumer = req.body;
    consumer.id = uuidv4();
    dane.db.seats.push(consumer);
    res.send('Customer: '+ consumer.author + ' ' +'is added to the database with id number: ' + consumer.id);

});

// [DONE]
router.route('/seats/:id').put((req, res) => {
    const id = req.params.id;
    const newCustomer = req.body;
    dane.db.seats.filter(i => {
        if(i.id == id){
            i.author = newCustomer.author;
            i.text = newCustomer.text;
        }
    })
    res.json(dane.db.seats)
});

// [DONE]
router.route('/seats/:id').delete((req, res) => {
    const id = req.params.id;
    dane.db.seats.filter(i => {
        if(i.id == id){
            let itemToDelete = dane.db.seats.indexOf(i);
            dane.db.seats.splice(itemToDelete, 1);
        }
    })
    res.json('ok')
});

module.exports = router;
