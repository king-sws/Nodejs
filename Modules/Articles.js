const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title : String,
    content : String,
    date : Number
});

const Article = mongoose.model('Article' , ArticleSchema)

module.exports = Article