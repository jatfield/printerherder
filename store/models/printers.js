'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Printer = new Schema ({
  ip: {type: String, required: true},
  model: {type: Number, required: true},
  counters: [{counter: String,
    queryTime: Date,
    value: Number}]
});

module.exports = mongoose.model('Printer', Printer);
