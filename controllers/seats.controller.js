const Seat = require('../models/seats.model');

exports.get = async (req, res) => {
    try {
        res.json(await Seat.find());
    } catch (err) {
        res.json({message: err});
    }
};

exports.getId = async (req, res) => {
    try {
        const doc = await Seat.findById(req.params.id);
        (!doc) ? res.status(404).json({message: 'Not Found'}) : res.json(doc);
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Seat.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const doc = await Seat.findOne().skip(rand);
        (!doc) ? res.status(404).json({message: 'Not Found'}) : res.json(doc);
      } catch (err) {
        res.status(500).json({message: err});
      }
    };

exports.post = async (req, res) => {
    try {
        const { id, day, seat, client, email } = req.body;
        const newSeat = new Seat({id: id, day: day, seat: seat, client: client, email: email});
        newSeat.save();
        res.json({message: newSeat})
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.put = async (req, res) => {
    try {
        const { id, day, seat, client, email } = req.body;
        const doc = await Seat.findById(req.params.id);
        if(doc){
          doc.day = day;
          doc.seat = seat;
          doc.client = client;
          doc.email = email;
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
        const doc = await Seat.findById(req.params.id);
        if(doc){
          await Seat.deleteOne({ _id: req.params.id});
          res.json({message: 'Deleted'})
        } else res.status(404).json({ message: 'Not found...' });
      } catch (err) {
        res.status(500).json({message: err})
      }
    };