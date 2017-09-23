const Word = require('../models/Word');

exports.getIndex = (req, res) => {
  Word.find((err, words) => {
    if(err){
      console.log("Error: " + err);
    } else {
      res.render('word/index', {
        title: 'Word index', 
        words: words,
      });
    }
  });
};



exports.getCreate = (req, res) => {
  res.render('word/create', {
    title: 'Create word'
  });
};

exports.postCreate = (req, res, next) => {
  req.assert('orignaltext', 'mandatory.').notEmpty();
  req.assert('translation', 'mandatory.').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/word/create');
  }

  const word = new Word({
    orignaltext: req.body.orignaltext,
    translation: req.body.translation
  });

  Word.findOne({ orignaltext: req.body.orignaltext }, (err, existingWord) => {
    if (err) { return next(err); }
    if (existingWord) {
      req.flash('errors', { msg: 'word already exists.' });
      return res.redirect('/word/create');
    }
    word.save((err) => {
      if (err) { return next(err); }
      res.redirect('/word');
    });
  });
};

