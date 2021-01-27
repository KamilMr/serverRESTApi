const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const dane = require('./../db');

// [DONE]
router.route('/concerts').get((req, res) => {
    res.send(dane.db.concerts)
});

//[DONE]
router.route('/concerts/:id').get((req, res, next) => {
    const id = req.params.id;
    for(let x in dane.db.concerts){
        if(id == dane.db.concerts[x].id){
            res.json(dane.db.concerts[x]);
        }
    }
});

// [DONE]
router.route('/concerts').post((req, res) => {
    const consumer = req.body;
    consumer.id = uuidv4();
    dane.db.concerts.push(consumer);
    res.send('Customer: '+ consumer.author + ' ' +'is added to the database with id number: ' + consumer.id);

});

// [DONE]
router.route('/concerts/:id').put((req, res) => {
    const id = req.params.id;
    const newCustomer = req.body;
    dane.db.concerts.filter(i => {
        if(i.id == id){
            i.author = newCustomer.author;
            i.text = newCustomer.text;
        }
    })
    res.json(dane.db.concerts)
});

// [DONE]
router.route('/concerts/:id').delete((req, res) => {
    const id = req.params.id;
    dane.db.concerts.filter(i => {
        if(i.id == id){
            let itemToDelete = dane.db.concerts.indexOf(i);
            dane.db.concerts.splice(itemToDelete, 1);
        }
    })
    res.json('ok')
});

module.exports = router;
