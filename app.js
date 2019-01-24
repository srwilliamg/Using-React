const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
const csrf = require('csurf'); //cross-site protection
const db = require('./config/db');

const port = process.env.PORT || 5000;
require('./config/passport')(passport);

const app = express();
// app.set('views', __dirname + '/client/public');
// app.engine('html', 'index.html');
// app.set('view engine', 'html');
app.use(express.static(path.join(__dirname + '/assets')));

var csrfProtection = csrf({ cookie: true });
//var parseForm = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());
app.use(session({
  secret: 'reactSecret',
  resave: true,
  saveUninitialized: true
}));

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;

  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true
    };
  } else {
    corsOptions = {
      origin: false
    };
  }

  return callback(null, corsOptions);
};
cors(corsOptionsDelegate);

var login = require('./routes/login');
var signUp = require('./routes/signUp');
var home = require('./routes/home');

app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use('/api/login', login);
app.use('/api/signUp', signUp);
app.use('/api/home', home);

app.get('/getToken', csrfProtection,(req, res) => {
  let session = req.session;
  const token = {
    'token': req.csrfToken(),
  };
  
  res.json(token);
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.redirect('error');
});

app.listen(port, () => `Server running on port ${port}`);