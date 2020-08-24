const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');

mongoose.promise = global.Promise;
const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

if (!isProduction) {
  app.use(errorHandler());
}

const mongoDbHost = 'mongodb://dima991911:192837465ds@ds161764.mlab.com:61764/online-shop';

mongoose.connect(mongoDbHost,
    {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);

app.use(require('./routes'));

app.listen(process.env.PORT || 8080, () => console.log(`Server running on 8080`));
