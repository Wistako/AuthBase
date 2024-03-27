const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');

const passport = require('passport');
const session = require('express-session');
const passportConfig = require('./config/passport');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');


const app = express();

// set handlebars
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

// init session mechanism
app.use(session({ secret: 'anything' }));

// init passport
app.use(passport.initialize());
app.use(passport.session());

// standard middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);


app.get('/', (req, res) => {
  res.render('index');
});
app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
