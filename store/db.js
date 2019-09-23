'use strict';

const {nconf} = require('../config/config.js');
const mongoose = require('mongoose');

const MONGO_USERNAME = nconf.get('mongo:username');
const MONGO_PASSWORD = nconf.get('mongo:password');
const MONGO_HOSTNAME = nconf.get('mongo:hostname');
const MONGO_PORT = nconf.get('mongo:port');
const MONGO_DB = nconf.get('mongo:db');
const AUTH_DB = nconf.get('mongo:authDb');

let url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=${AUTH_DB}`;
mongoose.connect(url, {useNewUrlParser: true}).catch(error => console.log(error));
