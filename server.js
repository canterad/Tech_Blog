// Import the path Module:
const path = require('path');

// Import the express Module:
const express = require('express');

// Import the express-session Module:
const session = require('express-session');

// Import the express-handlebars Module:
const exphbs = require('express-handlebars');

// Import all of the Controller Routes.
const routes = require('./controllers');

// Import all of the Sequelize Configuration Connection Module.
const sequelize = require('./config/connection');

// Import the Sequelize Session Store Module:
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create the express application variable.
const app = express();

// Create the constant variable for the port number
const PORT = process.env.PORT || 3001;

// Create the express handlebar.
const hbs = exphbs.create({});


// Sets up session and connect to our Sequelize db
const sess = {
  secret: 'Super secret secret',
  // Express session will use cookies by default, but we can specify options for those cookies by adding a cookies property 
  // to our session options.
  cookie: {
    // maxAge sets the maximum age for the session to be active. Listed in milliseconds.
    // 60,000 milliseconds = 1 minute.  15 minutes = 900000. 
    maxAge: 900000,
    // httpOnly tells express-session to only store session cookies when the protocol being used to connect to the server is HTTP.
    httpOnly: true,
    // secure tells express-session to only initialize session cookies when the protocol being used is HTTPS. Having this set to true, 
    // and running a server without encryption will result in the cookies not showing up in your developer console.    
    secure: false,
    // sameSite tells express-session to only initialize session cookies when the referrer provided by the client matches the domain
    // out server is hosted from.
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  // Sets up session store
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Add the session to the express application server.
app.use(session(sess));

// Adding the handlebar engine to the application engine.
// Telling the application that the filename extension is handlebars.
app.engine('handlebars', hbs.engine);

// Setting the view engine to handlebars.
app.set('view engine', 'handlebars');

// Setting up the middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting up the static path to be the public directory.
app.use(express.static(path.join(__dirname, 'public')));

// Setting up the routes.
app.use(routes);

// sync up sequelize - force equals false so data doesn't get dropped on every sync.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
