const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  orignaltext:  String,
  translation : String
}, { timestamps: true });

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
