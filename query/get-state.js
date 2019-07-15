'use strict';

const snmp = require('net-snmp');

const getState = (ip) => {
  const session = snmp.createSession(ip);
  return new Promise((resolve, reject) => {
  session.get(['1.3.6.1.2.1.25.3.2.1.5.1'], (error, varbinds) => {
    if (error) {
      reject(`${error}`);
    } else {
      resolve(varbinds[0].value);
    }
    session.close();
  });
});
}

module.exports = {getState};
