const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');



const ConcertsController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertsController.get);
router.get('/concerts/random', ConcertsController.getRandom);
router.get('/concerts/:id', ConcertsController.getId);
router.post('/concerts', ConcertsController.post);
router.put('/concerts/:id', ConcertsController.put);
router.delete('/concerts/:id', ConcertsController.delete);


module.exports = router;
