'use strict';

const fs = require('fs');
const path = require('path');

const snmp = require('net-snmp');

const Printer = require('../store/models/printers.js');
const printerModels = JSON.parse(fs.readFileSync(path.join(__dirname,"..","store","printer-models.json")));
const getCount = (printer) => {
  const session = snmp.createSession(printer.ip);
  const model = printerModels[printer.model];
  const counters = Object.keys(model.counters);
  const counterOids = Object.values(model.counters);

  return new Promise((resolve, reject) => {
    session.get(counterOids, (error, varbinds) => {
      if (error) {
        reject(error);
      } else {
        for (var i = 0; i < varbinds.length; i++) {
          printer.counters.push({counter: counters[i], value: varbinds[i].value, queryTime: Date.now()});
        }
        resolve(printer);
      }
      session.close();
    });
  });
};

const getCounts = async () => {
  const printers = await Printer.find({});
  for (let index = 0; index < printers.length; index ++) {
    await getCount(printers[index]);
    await printers[index].save();
  }
  return new Promise((resolve, reject) => {
    resolve(printers);
  });
};

module.exports = {getCounts};
