var mongoose = require('mongoose');
 
module.exports = mongoose.model('New',{
    name:  {type: String, index: true},
    preview: String,
    text: String,
    img: String,
    date: {type: Date, default: Date.now}
});
