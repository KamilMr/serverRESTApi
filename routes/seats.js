const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const SeatsController = require('../controllers/seats.controller');

router.get('/seats', SeatsController.get);
router.get('/seats/random', SeatsController.getRandom);
router.get('/seats/:id', SeatsController.getId);
router.post('/seats', SeatsController.post);
router.put('/seats/:id', SeatsController.put);
router.delete('/seats/:id', SeatsController.delete);


module.exports = router;
