'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Printer = new Schema ({
  ip: {type: String, required: true},
  bwCounter: {type: String, required: true},
});

module.exports = mongoose.model('Printer', Printer)
