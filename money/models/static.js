var mongoose = require('mongoose');
 
module.exports = mongoose.model('Static',{
    investor: Number,
    put: Number,
    take: Number
});

