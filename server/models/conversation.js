var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema defines how chat messages will be stored in MongoDB
var ConversationSchema = new Schema({
  participants: [
    {type: Schema.Types.ObjectId, ref: 'User'}
  ]
});

module.exports = mongoose.model('Conversation', ConversationSchema);
