var fs = require('fs');
var Faker= require('../index');
var definitions = require('../lib/definitions');

// Customer setup
var subsidiary = process.argv[2];
var customerLength = process.argv[3];
var orderLength = process.argv[4];

// check subsidiary arg
if (subsidiary == "snrf") {
  console.log("### Starting  generating " + customerLength + " customers with " + orderLength + " orders for "+ subsidiary);
  var fileName = 'fake-customer-' + subsidiary + '.json'
  //var product_qualif = "product_qualif_" + subsidiary;
} else if (subsidiary == "fta") {
  console.log("### Starting  generating " + customerLength + " customers with " + orderLength + " orders for "+ subsidiary);
  var fileName = 'fake-customer-' + subsidiary + '.json'
} else if (subsidiary == "qn") {
  console.log("### Starting  generating " + customerLength + " customers with " + orderLength + " orders for "+ subsidiary);
  var fileName = 'fake-customer-' + subsidiary + '.json'
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

  customer.company = {};
  customer.company.id = i;
  customer.company.name = customerName;
  customer.company.catchPhrase = Faker.Company.catchPhrase();
  customer.company.siren = Faker.Helpers.replaceSymbolWithNumber("### ### ###");


  customer.addresses = [];
  if (subsidiary == "snrf" || subsidiary == "fta") {
    address = {};
    address.street = Faker.Address.streetAddress();
    address.zip = "" + Faker.random.numberlowhigh(10, 98) + Faker.random.numberlowhigh(100, 999);
    address.city = Faker.Address.city();
    address.state = Faker.random.fr_state();
    address.type = "sales";
    customer.addresses.push(address);
    address = {};
    address.street = Faker.Address.streetAddress();
    address.zip = "" + Faker.random.numberlowhigh(10, 98) + Faker.random.numberlowhigh(100, 999);
    address.city = Faker.Address.city();
    address.state = Faker.random.fr_state();
    address.type = "shipping";
    customer.addresses.push(address);
  } else if (subsidiary == "qn") {
    var randomDept = Faker.random.number(5);
    switch (randomDept) {
      case 0:
      address = {};
      address.street = Faker.Address.streetAddress();
      address.zip = "" + Faker.random.numberlowhigh(44, 44) + Faker.random.numberlowhigh(100, 999);
      address.city = Faker.Helpers.shuffle(definitions.ville_loire_atlantique).slice(0, 1)[0];
      address.state = "Pays-de-Loire"; 
      address.type = "sales";
      customer.addresses.push(address);
      address = {};
      address.street = Faker.Address.streetAddress();
      address.zip = "" + Faker.random.numberlowhigh(44, 44) + Faker.random.numberlowhigh(100, 999);
      address.city = Faker.Helpers.shuffle(definitions.ville_loire_atlantique).slice(0, 1)[0];
      address.state = "Pays-de-Loire"; 
      address.type = "shipping";
      customer.addresses.push(address);
      break;
      case 1:
      address = {};
      address.street = Faker.Address.streetAddress();
      address.zip = "" + Faker.random.numberlowhigh(53, 53) + Faker.random.numberlowhigh(100, 999);
      address.city = Faker.Helpers.shuffle(definitions.ville_mayenne).slice(0, 1)[0];
      address.state = "Mayenne";  
      address.type = "sales";
      customer.addresses.push(address);
      address = {};
      address.street = Faker.Address.streetAddress();
      address.zip = "" + Faker.random.numberlowhigh(53, 53) + Faker.random.numberlowhigh(100, 999);
      address.city = Faker.Helpers.shuffle(definitions.ville_loire_atlantique).slice(0, 1)[0];
      address.state = "Mayenne";
      address.type = "shipping";
      customer.addresses.push(address);
      break;
      case 2:
      address = {};
      address.street = Faker.Address.streetAddress();
      address.zip = "" + Faker.random.numberlowhigh(85, 85) + Faker.random.numberlowhigh(100, 999);
      address.city = Faker.Helpers.shuffle(definitions.ville_vendee).slice(0, 1)[0];
      address.state = "Vendée"; 
      address.type = "sales";
      customer.addresses.push(address); 
      address = {};
      address.street = Faker.Address.streetAddress();
      address.zip = "" + Faker.random.numberlowhigh(85, 85) + Faker.random.numberlowhigh(100, 999);
      address.city = Faker.Helpers.shuffle(definitions.ville_vendee).slice(0, 1)[0];
      address.state = "Vendée";
      address.type = "shipping";
      customer.addresses.push(address);
      break;
      case 3:
      address = {};
      address.street = Faker.Address.streetAddress();
      address.zip = "" + Faker.random.numberlowhigh(72, 72) + Faker.random.numberlowhigh(100, 999);
      address.city = Faker.Helpers.shuffle(definitions.ville_sarthe).slice(0, 1)[0];
      address.state = "Sarthe";  
      address.type = "sales";
      customer.addresses.push(address);
      address = {};
      address.street = Faker.Address.streetAddress();
      address.zip = "" + Faker.random.numberlowhigh(72, 72) + Faker.random.numberlowhigh(100, 999);
      address.city = Faker.Helpers.shuffle(definitions.ville_sarthe).slice(0, 1)[0];
      address.state = "Sarthe";
      address.type = "shipping";
      customer.addresses.push(address);
      break;
      case 4:
      address = {};
      address.street = Faker.Address.streetAddress();
      address.zip = "" + Faker.random.numberlowhigh(49, 49) + Faker.random.numberlowhigh(100, 999);
      address.city = Faker.Helpers.shuffle(definitions.ville_maine_et_loire).slice(0, 1)[0];
      address.state = "Maine et Loire";  
      address.type = "sales";
      customer.addresses.push(address);
      address = {};
      address.street = Faker.Address.streetAddress();
      address.zip = "" + Faker.random.numberlowhigh(49, 49) + Faker.random.numberlowhigh(100, 999);
      address.city = Faker.Helpers.shuffle(definitions.ville_maine_et_loire).slice(0, 1)[0];
      address.state = "Maine et Loire";
      address.type = "shipping";
      customer.addresses.push(address);
      break;
    }
  }

  customer.contacts = [];
  for (var j = 1; j <= 3; j++) {
    switch ((j)) {
      case 1:
        countContactID ++;
        contact = {};
        contact.contactId = countContactID;
        contact.firstName = Faker.random.first_name();
        contact.lastName = Faker.random.last_name();
        contact.email = Faker.Helpers.slugify(contact.firstName.toLowerCase()) + "." + Faker.Helpers.slugify(contact.lastName.toLowerCase()) + "@" + customerInternetDomain;
        contact.phone = Faker.Helpers.replaceSymbolWithNumber("02 ## ## ## ##");
        contact.avatar = Faker.Image.avatar();
        contact.type = "admin";
        customer.contacts.push(contact);
        break;
      case 2:
        countContactID ++;
        contact = {};
        contact.contactId = countContactID;
        contact.firstName = Faker.random.first_name();
        contact.lastName = Faker.random.last_name();
        contact.email = Faker.Helpers.slugify(contact.firstName.toLowerCase()) + "." + Faker.Helpers.slugify(contact.lastName.toLowerCase()) + "@" + customerInternetDomain;
        contact.phone = Faker.Helpers.replaceSymbolWithNumber("06 ## ## ## ##");
        contact.avatar = Faker.Image.avatar();
        contact.type = "sales";
        customer.contacts.push(contact);
        break;
      case 3:
        countContactID ++;
        contact = {};
        contact.contactId = countContactID;
        contact.firstName = Faker.random.first_name();
        contact.lastName = Faker.random.last_name();
        contact.email = Faker.Helpers.slugify(contact.firstName.toLowerCase()) + "." + Faker.Helpers.slugify(contact.lastName.toLowerCase()) + "@" + customerInternetDomain;
        contact.phone = Faker.Helpers.replaceSymbolWithNumber("01 ## ## ## ##"); 
        contact.avatar = Faker.Image.avatar();       
        contact.type = "tech";
        customer.contacts.push(contact);
        break;
    }
  
  }

  customer.orders = [];
  for (var a = 1; a <= orderLength; a++) {

    var order = {};
    order.id = a;
    order.orderDescription = Faker.Helpers.shuffle(definitions.order_type1).slice(0, 1) + " " + Faker.Address.streetName();

    // var orderLineNumber = Faker.random.numberlowhigh(3,10);
    // var orderLines = [];
    // var amount = 0;
    // var orderLineId = 0;
    // for (var j = 1; j <= orderLineNumber ; j++) {
    //   orderLineId++;
    //   line = {};
    //   line.lineId = orderLineId;
    //   line.productId = Faker.random.numberlowhigh(1,10);
    //   line.quantity = Faker.random.numberlowhigh(1,5) + "00";
    //   line.unitPrice = Faker.random.numberlowhigh(1,3) + Faker.Helpers.shuffle(definitions.product_price_extention).slice(0, 1);
    //   line.lineAmount = line.unitPrice * line.quantity;
    //   amount = amount + line.lineAmount;
    //   orderLines.push(line);
    // }

    //order.lines = orderLines;
    
    order.amount = Faker.random.numberlowhigh(1000,5000);
    var createDate = Faker.Date.between(from, now);
    var shipDate = Faker.Date.future(1000, createDate);
    var updateDate = Faker.Date.between(createDate, shipDate);

    order.createDate = createDate;
    order.updateDate = updateDate;
    order.shipDate = shipDate;
  
    customer.orders.push(order);

  };

  // log the last to console
  if (i == customerLength) {
    console.log("--> Last customer");
    console.log(JSON.stringify(customer, null, 2));
  }

  // generate file
  var row = '';
  row += JSON.stringify(customer);
  row += '\n';
  fs.appendFileSync(fileName, row);

};

console.log("--> File [" + fileName + "] generated successfully !");


