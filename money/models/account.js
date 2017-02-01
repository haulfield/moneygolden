var mongoose = require('mongoose');
 
module.exports = mongoose.model('Put',{
    user: {type: String, ref: 'User', index: true},
    amount: Number,
    date: {type: Date, default: Date.now}
});

