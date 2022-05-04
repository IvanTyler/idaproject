require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const PORT = 3000;

const app = express();

const indexRouter = require('./src/routes/indexRoute');

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use('/', indexRouter);

app.listen(PORT || 3000, () => {
    console.log(`server work PORT: ${PORT}`)
});
