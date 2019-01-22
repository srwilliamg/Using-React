const express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var csrf = require('csurf'); //cross-site protection

const app = express();

// app.set('views', __dirname + '/client/public');
// app.engine('html', 'index.html');
// app.set('view engine', 'html');
app.use(express.static(path.join(__dirname + '/assets')));
app.use(cors());

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


const db = require('./config/db');

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

var csrfProtection = csrf({ cookie: true });
//var parseForm = bodyParser.urlencoded({ extended: false });

var login = require('./routes/login');
var signUp = require('./routes/signUp');
var home = require('./routes/home');

app.use(session({
  secret: 'reactSecret',
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

var session;

app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use('/api/login', login);
app.use('/api/signUp', signUp);
app.use('/api/home', home);

app.get('/getToken', csrfProtection,(req, res) => {
  session = req.session;
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

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);