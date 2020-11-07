var Backbone = require('backbone'),
    de = require('./lang/de'),
    en = require('./lang/en');


var model = new Backbone.Model({
    clickMe: "Click Me"
});

var langs = {
    de: de,
    en: en
};

model.loadLanguage = function(lang) {
    if (langs[lang]) {
        model.set(langs[lang]);
    }
};

model.loadLanguage("en");

module.exports = model;