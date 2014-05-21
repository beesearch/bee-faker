var fs = require('fs');
var Faker= require('../index');

// Company setup
var companyLength = 123;
var fileName = 'company.json'


fs.unlink(fileName);

console.log("### Starting  generating " + companyLength + " company ###");

// generate company file
for (var i = 1; i <= companyLength; i++) {

  var company = {};
  var companyName = Faker.Company.companyName();
 
  company.header = {};
  company.header.id = 1000 + i;
  company.header.companyname = companyName;
  company.header.catchPhrase = Faker.Company.catchPhrase();
  company.header.siren = Faker.Helpers.replaceSymbolWithNumber("### ### ###");
  
  company.commercialAddress = {};
  company.commercialAddress.street = Faker.Address.streetAddress();
  company.commercialAddress.zip = "" + Faker.random.numberlowhigh(10, 98) + Faker.random.numberlowhigh(100, 999);
  company.commercialAddress.city = Faker.Address.city();
  company.commercialAddress.state = Faker.random.fr_state();
  
  company.shippingAddress = {};
  company.shippingAddress.street = Faker.Address.streetAddress();
  company.shippingAddress.zip = "" + Faker.random.numberlowhigh(10, 98) + Faker.random.numberlowhigh(100, 999);
  company.shippingAddress.city = Faker.Address.city();
  company.shippingAddress.state = Faker.random.fr_state();
  
  company.contact = {};
  for (var j = 1; j <= 3; j++) {
    company.contact[j].firstname = Faker.random.first_name();
    company.contact[j].lastname = Faker.random.last_name();
    company.contact[j].email = Faker.Helpers.slugify(company.contact.firstname.toLowerCase()) + "." 
                          + Faker.Helpers.slugify(company.contact.lastname.toLowerCase()) + "@" 
                          + Faker.Helpers.slugify(companyName.toLowerCase() + "." 
                          + Faker.random.domain_suffix());
    

  }

  // log the last to console
  if (i == companyLength) {
    console.log("--> Last company");
    console.log(JSON.stringify(company, null, 2));
  }

  // generate file
  var row = '';
  row += JSON.stringify(company);
  row += '\n';
  fs.appendFileSync(fileName, row);

};

console.log("--> File [" + fileName + "] generated successfully !");


