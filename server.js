// import server packages
const express = require('express');
const mysql = require('mysql2');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

const sess = {
    secret: 'lsfasdfjsflsjf',
    cookie: {},
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// set up middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//start server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening at ${PORT}`));
});