const Concert = require('../models/concerts.model');

exports.get = async (req, res) => {
    try {
        res.json(await Concert.find());
    } catch (err) {
        res.json({message: err});
    }
};

exports.getId = async (req, res) => {
    try {
        const doc = await Concert.findById(req.params.id);
        (!doc) ? res.status(404).json({message: 'Not Found'}) : res.json(doc);
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Concert.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const doc = await Concert.findOne().skip(rand);
        (!doc) ? res.status(404).json({message: 'Not Found'}) : res.json(doc);
      } catch (err) {
        res.status(500).json({message: err});
      }
    };

exports.post = async (req, res) => {
    try {
        const { id, performer, genre, price, day, image } = req.body;
        const newConcert = new Concert({id: id, performer: performer, genre: genre, price: price, day: day, image: image});
        newConcert.save();
        res.json({message: newConcert})
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.put = async (req, res) => {
    try {
        const { id, performer, genre, price, day, image } = req.body;
        const doc = await Concert.findById(req.params.id);
        if(doc){
          doc.id = id;
          doc.performer = performer;
          doc.genre = genre;
          doc.price = price;
          doc.day = day;
          doc.image = image;
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
        const doc = await Concert.findById(req.params.id);
        if(doc){
          await Concert.deleteOne({ _id: req.params.id});
          res.json({message: 'Deleted'})
        } else res.status(404).json({ message: 'Not found...' });
      } catch (err) {
        res.status(500).json({message: err})
      }
    };