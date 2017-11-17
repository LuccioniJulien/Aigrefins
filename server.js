const express = require('express');
const path = require('path');
const moment = require('moment');
const bodyParser = require('body-parser');
const session = require('express-session');
const request = require('request');


const app = express();

const db = require('./database/init');
const index = require('./routes/index');
const users = require('./routes/users');

const port = process.argv[2] || '4242';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

db
  .sync()
  .then(() => {
    console.log('Database config success!');

    app.listen(port, err => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
