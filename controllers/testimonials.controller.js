const Testimonial = require('../models/testimonials.model');
const { v4: uuidv4 } = require('uuid');
const dane = require('./../db');

exports.get = async (req, res) => {
    try {
        res.json(await Testimonial.find());
    } catch (err) {
        res.json({message: err});
    }
};

exports.getId = async (req, res) => {
    try {
        const doc = await Testimonial.findById(req.params.id);
        (!doc) ? res.status(404).json({message: 'Not Found'}) : res.json(doc);
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const doc = await Testimonial.findOne().skip(rand);
        (!doc) ? res.status(404).json({message: 'Not Found'}) : res.json(doc);
      } catch (err) {
        res.status(500).json({message: err});
      }
    };

exports.post = async (req, res) => {
    try {
        const { author, text, id } = req.body;
        const newTestimonials = new Testimonial({id: id, author: author, text: text});
        newTestimonials.save();
        res.json({message: newTestimonials})
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.put = async (req, res) => {
    try {
        const { id, author, text } = req.body;
        const doc = await Testimonial.findById(req.params.id);
        if(doc){
          doc.author = author;
          doc.text = text;
          await doc.save();
          res.json({message: 'Ok'});
        }
        else res.status(404).json({message: 'Not found...'});
      } catch (err) {
        res.status(500).json({message: err})
      }
    };

exports.delete = async (req, res) => {
    try {
        const doc = await Testimonial.findById(req.params.id);
        if(doc){
          await Testimonial.deleteOne({ _id: req.params.id});
          res.json({message: 'Deleted'})
        } else res.status(404).json({ message: 'Not found...' });
      } catch (err) {
        res.status(500).json({message: err})
      }
    };