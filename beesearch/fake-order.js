var fs = require('fs');
var Faker= require('../index');
var definitions = require('../lib/definitions');

// order setup
var orderLength = 10000;
var subsidiary = process.argv[2];

// check subsidiary arg
if (subsidiary == "snrf") {
  console.log("### Starting  generating " + orderLength + " products for " + subsidiary);
  var fileName = 'fake-order-' + subsidiary + '.json'
  //var product_qualif = "product_qualif_" + subsidiary;
} else if (subsidiary == "fta") {
  console.log("### Starting  generating " + orderLength + " products for " + subsidiary);
  var fileName = 'fake-order-' + subsidiary + '.json'
} else if (subsidiary == "qn") {
  console.log("### Starting  generating " + orderLength + " products for " + subsidiary);
  var fileName = 'fake-order-' + subsidiary + '.json'
} else {
  console.log("### Error subsidiary must be 'snrf', 'fta' or 'qn'. Please retry...");
  process.exit(1);
}


var from = new Date(2005, 1, 1, 8, 0, 0, 0);
var now = new Date(2012, 27, 5, 18, 01, 02, 0);

//var nowParse = Date.parse(now);
//console.log("nowParse " + nowParse);

fs.unlink(fileName);

console.log("### Starting  generating " + orderLength + " order ###");

// generate order file
var orderLineId = 0;
for (var i = 1; i <= orderLength; i++) {

  var order = {};
  
  order.id = i;
  order.companyId = Faker.random.numberlowhigh(1,1000)
  order.orderDescription = Faker.Helpers.shuffle(definitions.order_type1).slice(0, 1) + " "
                        + Faker.Address.streetName();

  var orderLineNumber = Faker.random.numberlowhigh(3,10);
  var orderLines = [];
  var amount = 0;
  for (var j = 1; j <= orderLineNumber ; j++) {
    orderLineId++;
    line = {};
    line.lineId = orderLineId;
    line.productId = Faker.random.numberlowhigh(1,100);
    line.quantity = Faker.random.numberlowhigh(1,5) + "00";
    line.unitPrice = Faker.random.numberlowhigh(1,3) + Faker.Helpers.shuffle(definitions.product_price_extention).slice(0, 1);
    line.lineAmount = line.unitPrice * line.quantity;
    amount = amount + line.lineAmount;
    orderLines.push(line);
  }

  order.amount = amount;
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
  row += JSON.stringify(order);
  row += '\n';
  fs.appendFileSync(fileName, row);

};

console.log("--> File [" + fileName + "] generated successfully !");


