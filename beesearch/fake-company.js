var fs = require('fs');
var Faker= require('../index');

// Company setup
var companyLength = 1000;
var fileName = 'fake-company.json'
var countContactID = 0;

var from = new Date(2005, 1, 1, 8, 0, 0, 0);
var now = new Date(2012, 27, 5, 18, 01, 02, 0);

fs.unlink(fileName);

console.log("### Starting  generating " + companyLength + " company ###");

// generate company file
for (var i = 1; i <= companyLength; i++) {

  var company = {};
  var companyName = Faker.Company.companyName();
  var companyInternetDomain = Faker.Helpers.slugify(companyName.toLowerCase() + "." + Faker.random.domain_suffix());
 
  company.header = {};
  company.header.id = i;
  company.header.name = companyName;
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
        switch ((j)) {
        case 1:
          countContactID ++;
          company.contact.admin = {};
          company.contact.admin.contactID = countContactID;
          company.contact.admin.firstName = Faker.random.first_name();
          company.contact.admin.lastName = Faker.random.last_name();
          company.contact.admin.email = Faker.Helpers.slugify(company.contact.admin.firstName.toLowerCase()) + "." 
                                + Faker.Helpers.slugify(company.contact.admin.lastName.toLowerCase()) + "@" 
                                + companyInternetDomain;
          company.contact.admin.phone = Faker.Helpers.replaceSymbolWithNumber("02 ## ## ## ##");
          company.contact.admin.avatar = Faker.Image.avatar();
          break;
          case 2:
            countContactID ++;
            company.contact.sales = {};
            company.contact.sales.contactID = countContactID;
            company.contact.sales.firstName = Faker.random.first_name();
            company.contact.sales.lastName = Faker.random.last_name();
            company.contact.sales.email = Faker.Helpers.slugify(company.contact.sales.firstName.toLowerCase()) + "." 
                                  + Faker.Helpers.slugify(company.contact.sales.lastName.toLowerCase()) + "@" 
                                  + companyInternetDomain;
            company.contact.sales.phone = Faker.Helpers.replaceSymbolWithNumber("06 ## ## ## ##");
            company.contact.sales.avatar = Faker.Image.avatar();
            break;
          case 3:
            countContactID ++;
            company.contact.technical = {};
            company.contact.technical.contactID = countContactID;
            company.contact.technical.firstName = Faker.random.first_name();
            company.contact.technical.lastName = Faker.random.last_name();
            company.contact.technical.email = Faker.Helpers.slugify(company.contact.technical.firstName.toLowerCase()) + "." 
                                  + Faker.Helpers.slugify(company.contact.technical.lastName.toLowerCase()) + "@" 
                                  + companyInternetDomain;
            company.contact.technical.phone = Faker.Helpers.replaceSymbolWithNumber("01 ## ## ## ##"); 
            company.contact.technical.avatar = Faker.Image.avatar();          
            break;
        }

  }

  company.createDate = Faker.Date.between(from, now);
  company.updateDate = Faker.Date.between(company.createDate, now);


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


