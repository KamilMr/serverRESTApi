const express = require('express');
const router = express.Router();

const dane = require('./../db');
const TestimonialsController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialsController.get);
router.get('/testimonials/random', TestimonialsController.getRandom);
router.get('/testimonials/:id', TestimonialsController.getId);
router.post('/testimonials', TestimonialsController.post);
router.put('/testimonials/:id', TestimonialsController.put);
router.delete('/testimonials/:id', TestimonialsController.delete);

module.exports = router;
