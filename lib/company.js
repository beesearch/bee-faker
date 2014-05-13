var Faker = require("../index");

var company = {
    suffixes: function () {
        return ["Inc", "LLC", "Group", "SA", "S.A.", "SARL", "S.A.R.L.", "S.A.S.", "et Fils"];
    },

    companyName: function (format) {
        switch ((format ? format : Faker.random.number(3))) {
        case 0:
            return Faker.Name.lastName() + " " + this.companySuffix();
        case 1:
            return Faker.Name.lastName() + "-" + Faker.Name.lastName();
        case 2:
            return Faker.Name.lastName() + ", " + Faker.Name.lastName() + " et " + Faker.Name.lastName();
        }
    },

    companySuffix: function () {
        return Faker.random.array_element(this.suffixes());
    },

    catchPhrase: function () {
        return Faker.random.catch_phrase_adjective() + " " +
            Faker.random.catch_phrase_descriptor() + " " +
            Faker.random.catch_phrase_noun();
    },

    bs: function () {
        return Faker.random.bs_adjective() + " " +
            Faker.random.bs_buzz() + " " +
            Faker.random.bs_noun();
    }
};

module.exports = company;
