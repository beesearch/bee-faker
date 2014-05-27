var fs = require('fs');
var Faker= require('../index');
var definitions = require('../lib/definitions');

// product setup
var productLength = 1000;
var fileName = 'fake-product.json'

fs.unlink(fileName);

console.log("### Starting  generating " + productLength + " product ###");

// generate product file
for (var i = 1; i <= productLength; i++) {

  var product = {};
  var productName = Faker.Helpers.shuffle(definitions.product_qualif).slice(0, 1) + " "
                    + Faker.Helpers.shuffle(definitions.product_lorem).slice(0, 1) + " "
                    + Faker.Helpers.shuffle(definitions.product_material).slice(0, 1) + " ";
  var productHeight = Faker.random.numberlowhigh(30, 99) + "0";
  var productWidth = Faker.random.numberlowhigh(1, 9) + "0";
  var productWeight = (productHeight*productWidth)/10000 + "0";

  product.id = i;
  product.name = productName.toString().toUpperCase() + " "
                        + productHeight + " - "
                        + productWidth + " mm";
  product.height = productHeight;
  product.width = productWidth;
  product.weight = productWeight;
  product.price = Faker.random.numberlowhigh(1,15) + Faker.Helpers.shuffle(definitions.product_price_extention).slice(0, 1);

  // log the last to console
  if (i == productLength) {
    console.log("--> Last product");
    console.log(JSON.stringify(product, null, 2));
  }

  // generate file
  var row = '';
  row += JSON.stringify(product);
  row += '\n';
  fs.appendFileSync(fileName, row);

};

console.log("--> File [" + fileName + "] generated successfully !");


