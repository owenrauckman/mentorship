// --- Dependencies --- //
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local'),Strategy;
var mongoose = require('mongoose');
var cors = require('cors');
mongoose.connect('mongodb://owenrauckman:jayhawks@ds023398.mlab.com:23398/auth-test');
mongoose.Promise = global.Promise;
var db = mongoose.connection;

// --- Init App --- //
var app = express();

// --- Cors allows for Auth to work across different ports --- //
app.use(cors({origin: 'http://localhost:8080', credentials: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// --- BodyParser Middleware --- //
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// --- Express session --- //
app.use(session({
  secret: 'omgwutisthisgoingtobelater',
  saveUninitialized: true,
  resave: true
}));

// --- Passport Init --- //
app.use(passport.initialize());
app.use(passport.session());

// --- Init Router --- //
var router = express.Router();

// --- Init Controllers --- //
var passportController = require('./controllers/passportController');
var authController = require('./controllers/authController');
var userController = require('./controllers/userController');
var chatController = require('./controllers/chatController');

// --- Chat Routes --- //
router.route('/chat/')
  .get(passportController.ensureAuthenticated, chatController.getConversations);
router.route('/chat/:conversationId')
  .get(passportController.ensureAuthenticated, chatController.getConversation)
  // .post(passportController.ensureAuthenticated, chatController.sendReply); // probably not needed for now since we refactored new conversation
router.route('/chat/new/:recipient')
  .post(passportController.ensureAuthenticated, chatController.newConversation);

// --- API Routes --- //
router.route('/users/:username')
  .get(userController.getUser);
// By skills wanted / desired skillsPossessed/:skill?/:locationz
router.route('/search')
  .get(userController.getUsersBySearch);
router.route('/users/skillsDesired/:skill')
  .get(userController.getUsersBySkillsDesired);

// Edit User
router.route('/edit/:username')
  .put(userController.editUser);
router.route('/delete/:username')
  .delete(passportController.ensureAuthenticated, userController.deleteUser);

// --- Authentication Routes --- //
router.route('/auth/register')
  .post(authController.registerUser);
router.route('/auth/isLoggedIn')
  .get(authController.isLoggedIn);
router.route('/auth/login')
  .post(authController.loginUser);
router.route('/auth/logout')
  .get(authController.logout);

// --- Mount Routes to Router --- //
app.use('/api/', router);

// --- Start Server --- //
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function(){
  console.log('server startd on port: ' + app.get('port'));
});
