`use strict`

//walker script to explore MIB
const snmp = require('net-snmp');

const ip = process.argv[2].split(":")[0];
const port = process.argv[2].split(":")[1] || 161;
console.log(port);
const neededValue = process.argv[3];

var oid = "1.3.6.1.2.1.2.2";

function doneCb (error) {
    if (error) console.error (error.toString ());
}

function feedCb (varbinds) {
    for (var i = 0; i < varbinds.length; i++) {
        if (snmp.isVarbindError (varbinds[i])) {
            console.error (snmp.varbindError (varbinds[i]));
        } else if (neededValue) {
            if (varbinds[i].value == neededValue) {
              console.log (varbinds[i].oid + "|" + varbinds[i].value);
            }
        } else {
          console.log (varbinds[i].oid + "|" + varbinds[i].value);
        }
    }
}

var maxRepetitions = 20;

// The maxRepetitions argument is optional, and will be ignored unless using
// SNMP verison 2c
const session = snmp.createSession(ip, "public", {port});
session.walk (oid, maxRepetitions, feedCb, doneCb);
