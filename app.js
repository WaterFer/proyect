// Declared dependencies
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Calling Controllers
const path = require('path');
const app = express();
const UsersRouter = require('./controllers/Users');
const loginRouter = require('./controllers/login');
const authExtractor = require('./middleware/auth');
const logoutRouter = require('./controllers/logOut');
const AgendRouter = require('./controllers/agend');
const {MONGO_URI} = require('./config');

// Connection DATABASE
(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conecto a MongoDB');
  } catch (error) {
    console.log('No Conecto a MongoDB');
  }
})();


// Calling dependencies
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded());

// Calling Routers
app.use('/api/users', UsersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logOut', logoutRouter);
app.use('/api/agend', AgendRouter);

// Rooted
app.use('/', express.static(path.resolve(__dirname, 'views', 'home')));
app.use('/singup', express.static(path.resolve(__dirname, 'views', 'singup')));
app.use('/login', express.static(path.resolve(__dirname, 'views', 'login')));
app.use('/montar-curso', express.static(path.resolve(__dirname, 'views', 'montar-curso')));
app.use('/cejas&pestanas', express.static(path.resolve(__dirname, 'views', 'cejas&pestanas')));
app.use('/curso/:id', express.static(path.resolve(__dirname, 'views', 'curso')));
app.use('/img', express.static(path.resolve(__dirname, 'img')));
app.use('/agenda/:id', express.static(path.resolve(__dirname, 'views', 'agenda')));


module.exports = app;
