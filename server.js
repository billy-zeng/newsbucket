const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT

const routes = require('./routes');

// --------------------------------- Middleware --------------------------------- //

// cors
const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// BodyParser
app.use(bodyParser.json());

// Express Session
app.use(
  session({
    store: new MongoStore({ url: process.env.MONGO_URI }), 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false,
    cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // 2 weeks
    }
  })
);

// ----------------------------------- Routes ----------------------------------- //

app.get('/', (req, res) => {
  res.send('<h1>NEWS BUCKET</h1>');
});

app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/users', routes.users);
app.use('/api/v1/teams', routes.teams);
app.use('/api/v1/players', routes.players);

app.listen(PORT, () =>
  console.log(`Server connected at http://localhost:${PORT}`)
);
