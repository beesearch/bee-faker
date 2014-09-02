var fs = require('fs');
var Faker= require('../index');
var definitions = require('../lib/definitions');

// #######
//  SETUP
// #######
var subsidiary = process.argv[2];
var customerLength = process.argv[3];
var orderLength = process.argv[4];
var orderLineLenght = Faker.random.numberlowhigh(3,10);

console.log("Starting  generating " + customerLength + " customers for "+ subsidiary);
var customerFileName = 'fake-customer-' + subsidiary + '.csv';
var contactFileName = 'fake-contact-' + subsidiary + '.csv';
var orderFileName = 'fake-order-' + subsidiary + '.csv';
var orderLineFileName = 'fake-orderLine-' + subsidiary + '.csv';

var countContactId = 0;
var countOrderId = 0;
var countLineId = 0;

var from = new Date(2005, 1, 1, 8, 0, 0, 0);
var now = new Date(2012, 27, 5, 18, 01, 02, 0);

fs.unlinkSync(customerFileName);
fs.unlinkSync(contactFileName);
fs.unlinkSync(orderFileName);
fs.unlinkSync(orderLineFileName);


// ##########
//  CUSTOMER
// ##########
for (var i = 1; i <= customerLength; i++) {

  var customer = {};
  var customerName = Faker.Company.companyName();
  var customerInternetDomain = Faker.Helpers.slugify(customerName.toLowerCase() + "." + Faker.random.domain_suffix());

  customer = {};
  customer.id = i;
  customer.name = customerName;
  customer.catchPhrase = Faker.Company.catchPhrase();
  customer.siren = Faker.Helpers.replaceSymbolWithNumber("### ### ###");

  // generate customer file
  // var customerRow = '';
  // customerRow += JSON.stringify(customer);
  // customerRow += '\n';
  // fs.appendFileSync(customerFileName, customerRow);

  var customerRow = '';
  customerRow = customer.id + ";" + 
                customer.name + ";" + 
                customer.catchPhrase + ";" + 
                customer.siren; 
  customerRow += '\n';
  fs.appendFileSync(customerFileName, customerRow);


  // #########
  //  CONTACT
  // #########
  customer.contacts = [];
  for (var j = 1; j <= 3; j++) {
    switch ((j)) {
      case 1:
        countContactId ++;
        contact = {};
        contact.id = countContactId;
        contact.customerId = customer.id;
        contact.firstName = Faker.random.first_name();
        contact.lastName = Faker.random.last_name();
        contact.email = Faker.Helpers.slugify(contact.firstName.toLowerCase()) + "." + Faker.Helpers.slugify(contact.lastName.toLowerCase()) + "@" + customerInternetDomain;
        contact.phone = Faker.Helpers.replaceSymbolWithNumber("02 ## ## ## ##");
        contact.avatar = Faker.Image.avatar();
        contact.type = "admin";
        customer.contacts.push(contact);
        break;
      case 2:
        countContactId ++;
        contact = {};
        contact.id = countContactId;
        contact.customerId = customer.id;
        contact.firstName = Faker.random.first_name();
        contact.lastName = Faker.random.last_name();
        contact.email = Faker.Helpers.slugify(contact.firstName.toLowerCase()) + "." + Faker.Helpers.slugify(contact.lastName.toLowerCase()) + "@" + customerInternetDomain;
        contact.phone = Faker.Helpers.replaceSymbolWithNumber("06 ## ## ## ##");
        contact.avatar = Faker.Image.avatar();
        contact.type = "sales";
        customer.contacts.push(contact);
        break;
      case 3:
        countContactId ++;
        contact = {};
        contact.id = countContactId;
        contact.customerId = customer.id;
        contact.firstName = Faker.random.first_name();
        contact.lastName = Faker.random.last_name();
        contact.email = Faker.Helpers.slugify(contact.firstName.toLowerCase()) + "." + Faker.Helpers.slugify(contact.lastName.toLowerCase()) + "@" + customerInternetDomain;
        contact.phone = Faker.Helpers.replaceSymbolWithNumber("01 ## ## ## ##"); 
        contact.avatar = Faker.Image.avatar();       
        contact.type = "tech";
        customer.contacts.push(contact);
        break;
    }

    // generate customer file
    // var contactRow = '';
    // contactRow += JSON.stringify(contact);
    // contactRow += '\n';
    // fs.appendFileSync(contactFileName, contactRow);

    var contactRow = '';
    contactRow = contact.id + ";" + 
                contact.customerId + ";" +
                contact.firstName + ";" + 
                contact.lastName + ";" + 
                contact.email + ";" + 
                contact.phone + ";" + 
                contact.avatar + ";" + 
                contact.type ;
    contactRow += '\n';
    fs.appendFileSync(contactFileName, contactRow);
  
  }

  // #######
  //  ORDER
  // #######
  customer.orders = [];
  var orderNumber = Faker.random.numberlowhigh(3,orderLength);
  for (var k = 1; k <= orderNumber; k++) {

    countOrderId++;
    var order = {};
    order.id = countOrderId;
    order.customerId = customer.id;
    order.description = Faker.Helpers.shuffle(definitions.order_type1).slice(0, 1) + " " + Faker.Address.streetName();

    var createDate = Faker.Date.between(from, now);
    var shipDate = Faker.Date.future(1000, createDate);
    var updateDate = Faker.Date.between(createDate, shipDate);

    order.createDate = createDate;
    order.updateDate = updateDate;
    order.shipDate = shipDate;
  
    customer.orders.push(order);

    // generate order file
    // var orderRow = '';
    // orderRow += JSON.stringify(order);
    // orderRow += '\n';
    // fs.appendFileSync(orderFileName, orderRow);

    var orderRow = '';
    orderRow = order.id + ";" + 
                order.customerId + ";" +
                order.description + ";" + 
                order.createDate + ";" + 
                order.updateDate + ";" + 
                order.shipDate;
    orderRow += '\n';
    fs.appendFileSync(orderFileName, orderRow);

    
    // ############
    //  ORDER LINE
    // ############
    var orderLines = [];
    for (var l = 1; l <= orderLineLenght ; l++) {
      countLineId++;
      line = {};
      line.id = countLineId;
      line.orderId = order.id;
      if (subsidiary == "snrf") {
        line.productCategory = Faker.Helpers.shuffle(definitions.product_qualif_snrf).slice(0, 1);
        line.productName = line.productCategory + " "
                        + Faker.Helpers.shuffle(definitions.product_forme_snrf).slice(0, 1) + " "
                        + Faker.Helpers.shuffle(definitions.product_lorem).slice(0, 1);
      } else if (subsidiary == "fta") {
        line.productCategory = Faker.Helpers.shuffle(definitions.product_qualif_fta).slice(0, 1);
        line.productName = line.productCategory + " "
                        + Faker.Helpers.shuffle(definitions.product_lorem).slice(0, 1) + " "
                        + Faker.Helpers.shuffle(definitions.product_material).slice(0, 1);
      } else if (subsidiary == "qn") {
        line.productCategory = Faker.Helpers.shuffle(definitions.product_qualif_qn).slice(0, 1);
        line.productName = line.productCategory + " "
                        + Faker.Helpers.shuffle(definitions.product_lorem).slice(0, 1) + " "
                        + Faker.Helpers.shuffle(definitions.product_material).slice(0, 1);    
      }
      var categoryNumber = Faker.random.numberlowhigh(1, 10);
      line.orderCategory = Faker.Helpers.shuffle(definitions.product_lorem).slice(0, categoryNumber);
      line.quantity = Faker.random.numberlowhigh(1,5) * 100;
      line.unitPrice = Faker.random.numberlowhigh(1,3) * Faker.Helpers.shuffle(definitions.product_price_extention).slice(0, 1);
      line.lineAmount = line.unitPrice * line.quantity;
      orderLines.push(line);

      // generate orderLine file
      // var lineRow = '';
      // lineRow += JSON.stringify(line);
      // lineRow += '\n';
      // fs.appendFileSync(orderLineFileName, lineRow);

      var lineRow = '';
      lineRow = line.id + ";" + 
                  line.orderId + ";" +
                  line.productName + ";" + 
                  line.productCategory + ";" + 
                  line.orderCategory + ";" + 
                  line.quantity + ";" + 
                  line.unitPrice + ";" + 
                  line.lineAmount ;
      lineRow += '\n';
      fs.appendFileSync(orderLineFileName, lineRow);
    }

  };

  // log the last to console
  if (i % 100 === 0) {
    process.stdout.write(".");
    //console.log("--> Last customer");
    //console.log(JSON.stringify(customer, null, 2));
  }
  if (i % 1000 === 0) {
    console.log(i);
    //console.log("--> Last customer");
    //console.log(JSON.stringify(customer, null, 2));
  }

};

var total = parseInt(i)-1;
console.log(" completed " + total + " customers for " + subsidiary);