var fs = require('fs');
var Faker= require('../index');
var definitions = require('../lib/definitions');

// var zmq = require('zmq')
//   , sock = zmq.socket('push');

// sock.bindSync('tcp://127.0.0.1:3500');
// console.log('### Producer bound to port 3500');

// setInterval(function(){
//   console.log('sending work');
//   sock.send('some work');
// }, 2000);


// Customer setup
var subsidiary = process.argv[2];
var customerLength = process.argv[3];

// check subsidiary arg
if (subsidiary == "snrf") {
  console.log("### Starting  generating " + customerLength + " customers for "+ subsidiary);
  var fileName = 'fake-customer-' + subsidiary + '.csv'
  //var product_qualif = "product_qualif_" + subsidiary;
} else if (subsidiary == "fta") {
  console.log("### Starting  generating " + customerLength + " customers for "+ subsidiary);
  var fileName = 'fake-customer-' + subsidiary + '.csv'
} else if (subsidiary == "qn") {
  console.log("### Starting  generating " + customerLength + " customers for "+ subsidiary);
  var fileName = 'fake-customer-' + subsidiary + '.csv'
} else {
  console.log("### Error subsidiary must be 'snrf', 'fta' or 'qn'. Please retry...");
  process.exit(1);
}

var countContactID = 0;

var from = new Date(2005, 1, 1, 8, 0, 0, 0);
var now = new Date(2012, 27, 5, 18, 01, 02, 0);

fs.unlinkSync(fileName);

// generate customer file
for (var i = 1; i <= customerLength; i++) {

  var customer = {};
  var customerName = Faker.Company.companyName();
  var customerInternetDomain = Faker.Helpers.slugify(customerName.toLowerCase() + "." + Faker.random.domain_suffix());

  customer = {};
  customer.companyId = i;
  customer.name = customerName;
  customer.catchPhrase = Faker.Company.catchPhrase();
  customer.siren = Faker.Helpers.replaceSymbolWithNumber("### ### ###");





  // log the last to console
  if (i == customerLength) {
    console.log("--> Last customer");
    console.log(JSON.stringify(customer, null, 2));
  }

  // generate file
  var row = '';
  //row += JSON.stringify(customer);
  //row = json2csv.convert(customer, ["companyId", "name", "catchPhrase", "siren"], true);
  row = customer.companyId + ";" + customer.name + ";" + customer.catchPhrase + ";" + customer.siren; 
  row += '\n';
  fs.appendFileSync(fileName, row);

};

console.log("--> File [" + fileName + "] generated successfully !");


