var Fattura24 = require('../lib/fattura24').Fattura24;

var f24api = new Fattura24({ version: '0.3', apiKey: 'AiThae5peeph9aGhie1keeX9thuse1sh' });

f24api.testKey()
.then(function (result) {
  console.log(result);
})
.catch(function (error) {
  console.error(error);
});
