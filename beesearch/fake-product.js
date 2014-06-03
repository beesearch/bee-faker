var fs = require('fs');
var Faker= require('../index');
var definitions = require('../lib/definitions');

// product setup
var productLength = 1000;
var subsidiary = process.argv[2];

// check subsidiary arg
if (subsidiary == "snrf") {
  console.log("### Starting  generating " + productLength + " products for " + subsidiary);
  var fileName = 'fake-product-' + subsidiary + '.json'
  //var product_qualif = "product_qualif_" + subsidiary;
} else if (subsidiary == "fta") {
  console.log("### Starting  generating " + productLength + " products for " + subsidiary);
  var fileName = 'fake-product-' + subsidiary + '.json'
} else if (subsidiary == "qn") {
  console.log("### Starting  generating " + productLength + " products for " + subsidiary);
  var fileName = 'fake-product-' + subsidiary + '.json'
} else {
  console.log("### Error subsidiary must be 'snrf', 'fta' or 'qn'. Please retry...");
  process.exit(1);
}

fs.unlink(fileName);

// generate product file
for (var i = 1; i <= productLength; i++) {
  var product = {};

  if (subsidiary == "snrf") {
    var productName = Faker.Helpers.shuffle(definitions.product_qualif_snrf).slice(0, 1) + " "
                    + Faker.Helpers.shuffle(definitions.product_forme_snrf).slice(0, 1) + " "
                    + Faker.Helpers.shuffle(definitions.product_lorem).slice(0, 1) + " ";
  } else if (subsidiary == "fta") {
    var productName = Faker.Helpers.shuffle(definitions.product_qualif_fta).slice(0, 1) + " "
                    + Faker.Helpers.shuffle(definitions.product_lorem).slice(0, 1) + " "
                    + Faker.Helpers.shuffle(definitions.product_material).slice(0, 1) + " ";
  } else if (subsidiary == "qn") {
    var productName = Faker.Helpers.shuffle(definitions.product_qualif_qn).slice(0, 1) + " "
                    + Faker.Helpers.shuffle(definitions.product_lorem).slice(0, 1) + " "
                    + Faker.Helpers.shuffle(definitions.product_material).slice(0, 1) + " ";    
  }

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


