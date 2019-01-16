const express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf'); //cross-site protection

const app = express();

// app.set('views', __dirname + '/client/public');
// app.engine('html', 'index.html');
// app.set('view engine', 'html');
app.use(express.static(path.join(__dirname + '/assets')));

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

app.use('/login', login);
app.use('/signUp', signUp);
app.use('/home', home);

app.get('/api/customers', csrfProtection,(req, res) => {
  session = req.session;
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);