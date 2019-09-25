'use strict'

const snmp = require('net-snmp');
const Printer = require('../store/models/printers.js');

const getCount = (printer) => {
  const session = snmp.createSession(printer.ip);
  return new Promise((resolve, reject) => {
    session.get(['1.3.6.1.2.1.43.10.2.1.4.1.1'], (error, varbinds) => {
      if (error) {
        reject(error);
      } else {
        for (var i = 0; i < varbinds.length; i++) {
          printer.bwCounts.push({value: varbinds[i].value, queryTime: Date.now()});
        }
        resolve(printer);
      }
      session.close();
    });
  });
}
 
const queryCounters = async () => {
  const printers = await Printer.find({});
  for (let index = 0; index < printers.length; index ++) {
    await getCount(printers[index]);
    await printers[index].save();
  };
  return new Promise((resolve, reject) => {
    resolve(printers);
  });
}

module.exports = {queryCounters};
