var fs = require('fs');
var Faker= require('../index');

var length = process.argv[2];
var commit = process.argv[3];
var fileName = 'customer.json'

fs.unlink(fileName);


console.log("### Starting Customer ###");

// generate customer file
for (var i = length - 1; i >= 0; i--) {
  
  // create 
  var customer = {};
  customer.firstname = Faker.random.first_name();
  customer.lastname = Faker.random.last_name();
  var companyName = Faker.Company.companyName()
  customer.email = Faker.Helpers.slugify(customer.firstname.toLowerCase()) + "." 
                      + Faker.Helpers.slugify(customer.lastname.toLowerCase()) + "@" 
                      + Faker.Helpers.slugify(companyName.toLowerCase() + "." 
                      + Faker.random.domain_suffix());
  customer.company = {};
  customer.company.name = companyName;
  customer.company.catchPhrase = Faker.Company.catchPhrase();
  customer.company.siren = Faker.Helpers.replaceSymbolWithNumber("### ### ###");
  customer.adress = {};
  customer.adress.street = Faker.Address.streetAddress();
  customer.adress.zip = "" + Faker.random.numberlowhigh(10, 98) + Faker.random.numberlowhigh(100, 999);
  customer.adress.city = Faker.Address.city();
  customer.adress.state = Faker.random.fr_state();

  // log the last to console
  if (i === 0) {
    console.log("--> Last Customer");
    console.log(JSON.stringify(customer, null, 2));
  }

  // generate file
  var row = '';
  row += JSON.stringify(customer);
  row += '\n';
  fs.appendFileSync(fileName, row);

};

console.log("--> File [" + fileName + "] generated successfully !");


