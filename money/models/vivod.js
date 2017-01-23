var mongoose = require('mongoose');
 
module.exports = mongoose.model('Take',{
    user: {type: String, ref: 'User'},
    ammount: Number,
    date: Date
});

