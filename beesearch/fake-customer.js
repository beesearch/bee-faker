var fs = require('fs');
var Faker= require('../index');
var definitions = require('../lib/definitions');


// Customer setup
var customerLength = 1000;
var subsidiary = process.argv[2];

// check subsidiary arg
if (subsidiary == "snrf") {
  console.log("### Starting  generating " + customerLength + " products for " + subsidiary);
  var fileName = 'fake-customer-' + subsidiary + '.json'
  //var product_qualif = "product_qualif_" + subsidiary;
} else if (subsidiary == "fta") {
  console.log("### Starting  generating " + customerLength + " products for " + subsidiary);
  var fileName = 'fake-customer-' + subsidiary + '.json'
} else if (subsidiary == "qn") {
  console.log("### Starting  generating " + customerLength + " products for " + subsidiary);
  var fileName = 'fake-customer-' + subsidiary + '.json'
} else {
  console.log("### Error subsidiary must be 'snrf', 'fta' or 'qn'. Please retry...");
  process.exit(1);
}

var countContactID = 0;

var from = new Date(2005, 1, 1, 8, 0, 0, 0);
var now = new Date(2012, 27, 5, 18, 01, 02, 0);

fs.unlink(fileName);

console.log("### Starting  generating " + customerLength + " customer ###");

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

   if (subsidiary == "snrf") {
    customer.commercialAddress = {};
    customer.commercialAddress.street = Faker.Address.streetAddress();
    customer.commercialAddress.zip = "" + Faker.random.numberlowhigh(10, 98) + Faker.random.numberlowhigh(100, 999);
    customer.commercialAddress.city = Faker.Address.city();
    customer.commercialAddress.state = Faker.random.fr_state();
    customer.shippingAddress = {};
    customer.shippingAddress.street = Faker.Address.streetAddress();
    customer.shippingAddress.zip = "" + Faker.random.numberlowhigh(10, 98) + Faker.random.numberlowhigh(100, 999);
    customer.shippingAddress.city = Faker.Address.city();
    customer.shippingAddress.state = Faker.random.fr_state();  
  } else if (subsidiary == "fta") {
    customer.commercialAddress = {};
    customer.commercialAddress.street = Faker.Address.streetAddress();
    customer.commercialAddress.zip = "" + Faker.random.numberlowhigh(10, 98) + Faker.random.numberlowhigh(100, 999);
    customer.commercialAddress.city = Faker.Address.city();
    customer.commercialAddress.state = Faker.random.fr_state();
    customer.shippingAddress = {};
    customer.shippingAddress.street = Faker.Address.streetAddress();
    customer.shippingAddress.zip = "" + Faker.random.numberlowhigh(10, 98) + Faker.random.numberlowhigh(100, 999);
    customer.shippingAddress.city = Faker.Address.city();
    customer.shippingAddress.state = Faker.random.fr_state();   
  } else if (subsidiary == "qn") {
      var randomDept = Faker.random.number(5);
      switch (randomDept) {
        case 0:
                customer.commercialAddress = {};
                customer.commercialAddress.street = Faker.Address.streetAddress();
                customer.commercialAddress.zip = "" + Faker.random.numberlowhigh(44, 44) + Faker.random.numberlowhigh(100, 999);
                customer.commercialAddress.city = Faker.Helpers.shuffle(definitions.ville_loire_atlantique).slice(0, 1)[0];
                customer.commercialAddress.state = "Pays-de-Loire";  
                customer.shippingAddress = {};
                customer.shippingAddress.street = Faker.Address.streetAddress();
                customer.shippingAddress.zip = "" + Faker.random.numberlowhigh(44, 44) + Faker.random.numberlowhigh(100, 999);
                customer.shippingAddress.city = Faker.Helpers.shuffle(definitions.ville_loire_atlantique).slice(0, 1)[0];
                customer.shippingAddress.state = "Pays-de-Loire"; 
            break;
        case 1:
                customer.commercialAddress = {};
                customer.commercialAddress.street = Faker.Address.streetAddress();
                customer.commercialAddress.zip = "" + Faker.random.numberlowhigh(53, 53) + Faker.random.numberlowhigh(100, 999);
                customer.commercialAddress.city = Faker.Helpers.shuffle(definitions.ville_mayenne).slice(0, 1)[0];
                customer.commercialAddress.state = "Mayenne";  
                customer.shippingAddress = {};
                customer.shippingAddress.street = Faker.Address.streetAddress();
                customer.shippingAddress.zip = "" + Faker.random.numberlowhigh(53, 53) + Faker.random.numberlowhigh(100, 999);
                customer.shippingAddress.city = Faker.Helpers.shuffle(definitions.ville_loire_atlantique).slice(0, 1)[0];
                customer.shippingAddress.state = "Mayenne";
             break;
        case 2:
                customer.commercialAddress = {};
                customer.commercialAddress.street = Faker.Address.streetAddress();
                customer.commercialAddress.zip = "" + Faker.random.numberlowhigh(85, 85) + Faker.random.numberlowhigh(100, 999);
                customer.commercialAddress.city = Faker.Helpers.shuffle(definitions.ville_vendee).slice(0, 1)[0];
                customer.commercialAddress.state = "Vendée";  
                customer.shippingAddress = {};
                customer.shippingAddress.street = Faker.Address.streetAddress();
                customer.shippingAddress.zip = "" + Faker.random.numberlowhigh(85, 85) + Faker.random.numberlowhigh(100, 999);
                customer.shippingAddress.city = Faker.Helpers.shuffle(definitions.ville_vendee).slice(0, 1)[0];
                customer.shippingAddress.state = "Vendée";
             break;
        case 3:
                customer.commercialAddress = {};
                customer.commercialAddress.street = Faker.Address.streetAddress();
                customer.commercialAddress.zip = "" + Faker.random.numberlowhigh(72, 72) + Faker.random.numberlowhigh(100, 999);
                customer.commercialAddress.city = Faker.Helpers.shuffle(definitions.ville_sarthe).slice(0, 1)[0];
                customer.commercialAddress.state = "Sarthe";  
                customer.shippingAddress = {};
                customer.shippingAddress.street = Faker.Address.streetAddress();
                customer.shippingAddress.zip = "" + Faker.random.numberlowhigh(72, 72) + Faker.random.numberlowhigh(100, 999);
                customer.shippingAddress.city = Faker.Helpers.shuffle(definitions.ville_sarthe).slice(0, 1)[0];
                customer.shippingAddress.state = "Sarthe";
             break;
        case 4:
                customer.commercialAddress = {};
                customer.commercialAddress.street = Faker.Address.streetAddress();
                customer.commercialAddress.zip = "" + Faker.random.numberlowhigh(49, 49) + Faker.random.numberlowhigh(100, 999);
                customer.commercialAddress.city = Faker.Helpers.shuffle(definitions.ville_maine_et_loire).slice(0, 1)[0];
                customer.commercialAddress.state = "Maine et Loire";  
                customer.shippingAddress = {};
                customer.shippingAddress.street = Faker.Address.streetAddress();
                customer.shippingAddress.zip = "" + Faker.random.numberlowhigh(49, 49) + Faker.random.numberlowhigh(100, 999);
                customer.shippingAddress.city = Faker.Helpers.shuffle(definitions.ville_maine_et_loire).slice(0, 1)[0];
                customer.shippingAddress.state = "Maine et Loire";
             break;
      }
  }

  customer.contact = {}; 
  for (var j = 1; j <= 3; j++) {
        switch ((j)) {
        case 1:
          countContactID ++;
          customer.contact.admin = {};
          customer.contact.admin.contactID = countContactID;
          customer.contact.admin.firstName = Faker.random.first_name();
          customer.contact.admin.lastName = Faker.random.last_name();
          customer.contact.admin.email = Faker.Helpers.slugify(customer.contact.admin.firstName.toLowerCase()) + "." 
                                + Faker.Helpers.slugify(customer.contact.admin.lastName.toLowerCase()) + "@" 
                                + customerInternetDomain;
          customer.contact.admin.phone = Faker.Helpers.replaceSymbolWithNumber("02 ## ## ## ##");
          customer.contact.admin.avatar = Faker.Image.avatar();
          break;
          case 2:
            countContactID ++;
            customer.contact.sales = {};
            customer.contact.sales.contactID = countContactID;
            customer.contact.sales.firstName = Faker.random.first_name();
            customer.contact.sales.lastName = Faker.random.last_name();
            customer.contact.sales.email = Faker.Helpers.slugify(customer.contact.sales.firstName.toLowerCase()) + "." 
                                  + Faker.Helpers.slugify(customer.contact.sales.lastName.toLowerCase()) + "@" 
                                  + customerInternetDomain;
            customer.contact.sales.phone = Faker.Helpers.replaceSymbolWithNumber("06 ## ## ## ##");
            customer.contact.sales.avatar = Faker.Image.avatar();
            break;
          case 3:
            countContactID ++;
            customer.contact.technical = {};
            customer.contact.technical.contactID = countContactID;
            customer.contact.technical.firstName = Faker.random.first_name();
            customer.contact.technical.lastName = Faker.random.last_name();
            customer.contact.technical.email = Faker.Helpers.slugify(customer.contact.technical.firstName.toLowerCase()) + "." 
                                  + Faker.Helpers.slugify(customer.contact.technical.lastName.toLowerCase()) + "@" 
                                  + customerInternetDomain;
            customer.contact.technical.phone = Faker.Helpers.replaceSymbolWithNumber("01 ## ## ## ##"); 
            customer.contact.technical.avatar = Faker.Image.avatar();          
            break;
        }

  }

  customer.createDate = Faker.Date.between(from, now);
  customer.updateDate = Faker.Date.between(customer.createDate, now);


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


