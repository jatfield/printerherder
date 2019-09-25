'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Printer = new Schema ({
  ip: {type: String, required: true},
  bwCounts: [{queryTime: Date,
              value: Number,}],
});

module.exports = mongoose.model('Printer', Printer)
