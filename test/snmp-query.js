'use strict'

const snmp = require('net-snmp');

const session = snmp.createSession('');

session.get(['1.3.6.1.2.1.25.3.2.1.5.1'], (error, varbinds) => {
  if (error) {
    console.log(`${error}`);
  } else {
    console.log(`Connection successful`);
    console.log(`${varbinds[0].oid} = ${varbinds[0].value} (${varbinds[0].type})`);
  }
  session.close();
});
