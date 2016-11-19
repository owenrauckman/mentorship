var Conversation = require('../models/conversation');
var Message = require('../models/message');
var User = require('../models/user');

// GET a list of the conversations
exports.getConversations = function(req, res, next){
  // Only return one message from each conversation to display as snippet
  Conversation.find({participants: req.user._id}) //user.id (is the auth user)
    .select('_id')
    .exec(function(err, conversations){
      if(err){
        res.send({error: err});
        return next(err);
      }
      if(!conversations || conversations.length == 0){
        return res.json({"message": "This user does not have any conversations"});
      }

      // Set up empty array to hold conversations + most recent message
      var fullConversations = [];
      conversations.forEach(function(conversation){
        Message.find({'conversationId': conversation._id})
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: "author",
            select: "name" // todo update this per user schema
          })
          .exec(function(err, message){
            if(err){
              res.send({error: err});
              return next(err);
            }
            fullConversations.push(message);
            if(fullConversations.length === conversations.length){
              return res.status(200).json({conversations: fullConversations});
            }
          });
      });

    });
}

// GET all messages of a single conversation
exports.getConversation = function(req, res, next){
  Message.find({conversationId: req.params.conversationId})
    .select('createdAt body author')
    .sort('-createdAt')
    .populate({
      path: 'author',
      select: 'name'
    })
    .exec(function(err, messages){
      if(err){
        res.send({error: err});
        return next(err);
      }
      res.status(200).json({conversation: messages});
    })
}

//TODO: // all of these routes needing a user will have to be authenticated (with passport at beginning)
// POST start a new conversation
exports.newConversation = function(req, res, next){
  // make sure the params are there
  if(!req.params.recipient){
    res.status(422).send({error: 'Please choose a valid recipient for your message'});
    return next();
  }
  if(!req.body.composedMessage){
    res.status(422).send({error: 'Please enter a message'});
    return next();
  }
  // we have to perform a find to convert the username to an ID for the chat controllers
  User.findOne({username: req.params.recipient}, function (err, user) {
    if(err){
      return res.status(500).json({message: err.message});
    }

    // check to see if conversation already exists
    Conversation.findOne( {$and: [{participants: req.user.id}, {participants: user.id}] }, function(err, convo, next){
      var conversatonToUse;
      if(convo){
        conversationToUse = convo;
      }
      else{
        conversationToUse = new Conversation({
          participants: [req.user.id, user.id]
        });
      }
      // Populate the conversation
      conversationToUse.save(function(err, newConversation){
        if(err){
          res.send({error: err});
          return next(err);
        }
        var message = new Message({
          conversationId: newConversation._id,
          body: req.body.composedMessage,
          author: user._id,
          from: req.user.username,
          to: user.username
        });

        message.save(function(err, newMessage){
          if(err){
            res.send({error: err});
            return next(err);
          }
          return res.json({message: 'Message sent!',conversationId: newConversation._id});
        });
      });

    });
  });
}

// POST send reply
exports.sendReply = function(req, res, next){
  var reply = new Message({
    conversationId: req.params.conversationId,
    body: req.body.composedMessage,
    author: req.user._id
  });

  reply.save(function(err, sentReply){
    if(err){
      res.send({error: err});
      return next(err);
    }
    res.status(200).json({message: 'Reply successfully sent!'});
    return(next);
  });
}

//TODO: // if you want, add DELTE/PUT routes http://blog.slatepeak.com/creating-a-real-time-chat-api-with-node-express-socket-io-and-mongodb/
