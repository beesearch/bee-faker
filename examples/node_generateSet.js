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
  client.email = Faker.Helpers.slugify(client.firstname.toLowerCase()) + "." + Faker.Helpers.slugify(client.lastname.toLowerCase()) + "@" + Faker.Helpers.slugify(Faker.Internet.domainName());
  client.company = {};
  client.company.name = Faker.Company.companyName();
  client.company.catchPhrase = Faker.Company.catchPhrase();
  client.company.siren = Faker.Helpers.replaceSymbolWithNumber("### ### ###");
  client.adress = {};
  client.adress.street = Faker.Address.streetAddress();
  client.adress.zip = "" + Faker.random.numberlowhigh(10, 98) + Faker.random.numberlowhigh(100, 999);
  client.adress.city = Faker.Address.city();
  client.adress.state = Faker.random.fr_state();

  if (logs) {
    console.log(JSON.stringify(client));
  };
  
  bigSet.push(client);

  // Empty array in a file every 10 items
  if (bigSet.length >= 0) {
    fs.appendFile('bigDataSet.json', JSON.stringify(bigSet, null, 2), function(err) {
      if (err) throw err;
      // Log
      console.log("appended bigDataSet.json");
    });
    // Empty the array ;)
    bigSet.length = 0;
  };
};

console.log("bigDataSet.json generated successfully!");
