var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deploySchema = new Schema({
  url: {type: String},
  templateName: {type: String},
  version: {type: String},
  deployedAt: {type: Date}
});
module.exports = mongoose.model('Deploy', deploySchema);