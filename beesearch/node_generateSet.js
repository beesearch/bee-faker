var sys = require('sys')
   , fs = require('fs');

var Faker= require('../index');

var length = process.argv[2];
var logs = process.argv[3];

fs.unlink('bigDataSet.json');

// generate bigDataSet as example
var bigSet = [];
for (var i = length - 1; i >= 0; i--) {
  var client = {};
  client.firstname = Faker.random.first_name();
  client.lastname = Faker.random.last_name();
  var companyName = Faker.Company.companyName()
  client.email = Faker.Helpers.slugify(client.firstname.toLowerCase()) + "." + Faker.Helpers.slugify(client.lastname.toLowerCase()) + "@" + Faker.Helpers.slugify(companyName.toLowerCase() + "." + Faker.random.domain_suffix());
  client.company = {};
  client.company.name = companyName;
  client.company.catchPhrase = Faker.Company.catchPhrase();
  client.company.siren = Faker.Helpers.replaceSymbolWithNumber("### ### ###");
  client.adress = {};
  client.adress.street = Faker.Address.streetAddress();
  client.adress.zip = "" + Faker.random.numberlowhigh(10, 98) + Faker.random.numberlowhigh(100, 999);
  client.adress.city = Faker.Address.city();
  client.adress.state = Faker.random.fr_state();

  var row = '';
  if (bigSet.length > 0) {
    row += '\r';
  }
  row += JSON.stringify(client);

  if (logs) {
    console.log(JSON.stringify(client, null, 2));
  };

  bigSet.push(row);
};

fs.appendFile('bigDataSet.json', bigSet, function(err) {
  if (err) throw err;
  // Log
  console.log("appended bigDataSet.json");
});
console.log("bigDataSet.json generated successfully!");
