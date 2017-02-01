var mongoose = require('mongoose');
 
module.exports = mongoose.model('Take',{
    user: {type: String, ref: 'User', index: true},
    ammount: Number,
    date: Date
});

