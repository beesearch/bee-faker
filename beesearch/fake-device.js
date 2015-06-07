var fs = require('fs');
var Faker= require('../index');
var definitions = require('../lib/definitions');

// #######
//  SETUP
// #######

console.log("Starting  generating weight data !");
var deviceFileName = 'fake-weight.csv';


var from = new Date(2014, 0, 1, 0, 0, 0, 0);
var now = new Date(2014, 11, 31, 23, 59, 59, 999);

fs.unlinkSync(deviceFileName);

var countDeviceId = 0;

// ##############
//  weight trace
// ##############
for (var i = 1; i <= 10; i++) {

    var trace = {};

    trace.SID = Faker.Helpers.replaceSymbolWithNumber("####-####-####-####");

    for (var a = 1; a <= 1000; a++) {

        countDeviceId++;

        trace.id = countDeviceId;

        var traceDate = Faker.Date.between(from, now);

        trace.date = traceDate;
        var looseWeight = trace.date.substring(5,7);

        trace.weight = Faker.random.numberlowhigh(900, 950)/10-looseWeight;

        console.log("--> " + looseWeight);

        var traceRow = '';
        traceRow = trace.id + ";" +
            trace.SID + ";" +
            trace.date + ";" +
            trace.weight;

        traceRow += '\n';
        fs.appendFileSync(deviceFileName, traceRow);

    }

  // log the last to console
  if (i % 100 === 0) {
    process.stdout.write(".");
  }
  if (i % 1000 === 0) {
    console.log(i);
  }

};

var total = parseInt(i)-1;
console.log(" completed " + countDeviceId + " trace...");