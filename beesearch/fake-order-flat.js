var fs = require('fs');
var Faker= require('../index');
var definitions = require('../lib/definitions');

// order setup
var subsidiary = process.argv[2];
var customerLength = process.argv[3];
var orderLength = process.argv[4];

// check subsidiary arg
if (subsidiary == "snrf") {
  console.log("### Starting  generating " + orderLength + " orders for " + subsidiary);
  var fileName = 'fake-order-' + subsidiary + '.csv'
  //var product_qualif = "product_qualif_" + subsidiary;
} else if (subsidiary == "fta") {
  console.log("### Starting  generating " + orderLength + " orders for " + subsidiary);
  var fileName = 'fake-order-' + subsidiary + '.csv'
} else if (subsidiary == "qn") {
  console.log("### Starting  generating " + orderLength + " orders for " + subsidiary);
  var fileName = 'fake-order-' + subsidiary + '.csv'
} else {
  console.log("### Error subsidiary must be 'snrf', 'fta' or 'qn'. Please retry...");
  process.exit(1);
}


var from = new Date(2005, 1, 1, 8, 0, 0, 0);
var now = new Date(2012, 27, 5, 18, 01, 02, 0);

//var nowParse = Date.parse(now);
//console.log("nowParse " + nowParse);

fs.unlinkSync(fileName);

// generate order file
var orderLineId = 0;
for (var i = 1; i <= orderLength; i++) {

  var order = {};
  
  order.id = i;
  var maxCustomerId = parseInt(customerLength) + 1;
  order.customerId = Faker.random.numberlowhigh(1,maxCustomerId)
  order.orderDescription = Faker.Helpers.shuffle(definitions.order_type1).slice(0, 1) + " "
                        + Faker.Address.streetName();

  var orderLineNumber = Faker.random.numberlowhigh(3,10);
  var orderLines = [];
  var amount = 0;
 
  order.amount = Faker.random.numberlowhigh(100,1000);
  order.lines = orderLines;
  var createDate = Faker.Date.between(from, now);
  var shipDate = Faker.Date.future(1000, createDate);
  var updateDate = Faker.Date.between(createDate, shipDate);

  order.createDate = createDate;
  order.updateDate = updateDate;
  order.shipDate = shipDate;

  // log the last to console
  if (i == orderLength) {
    console.log("--> Last order");
    console.log(JSON.stringify(order, null, 2));
  }

  // generate file
  var row = '';
  row = order.id + ";" + order.customerId + ";" + order.orderDescription + ";" + order.amount + ";" + order.createDate + ";" + order.updateDate + ";" + order.shipDate; 
  row += '\n';
  fs.appendFileSync(fileName, row);

};

console.log("--> File [" + fileName + "] generated successfully !");


