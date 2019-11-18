'use strict';

const snmp = require('net-snmp');
const Printer = require('../store/models/printers.js');

const getOids = (printer) => {
  const session = snmp.createSession(printer.ip);
  let results = [];
  return new Promise((resolve, reject) => {
    session.get(['1.3.6.1.2.1.25.3.2.1.5.1'], (error, varbinds) => {
      if (error) {
        reject(error);
      } else {
        for (var i = 0; i < varbinds.length; i++) {
          results.push(`${printer.id}: ${varbinds[i].oid}: ${varbinds[i].value}`);
        }
        resolve(results);
      }
      session.close();
    });
  });
};

const queryCounters = async () => {
  const printers = await Printer.find({});
  let queries = [];
  printers.forEach((printer) => {
    queries.push(getOids(printer));
  });
  return new Promise((resolve, reject) => {
    Promise.all(queries).then((results) => {
      resolve(results);
    });
  });
};

module.exports = {queryCounters};
