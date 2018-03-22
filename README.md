# Fattura24 Node.js SDK

💻 Interact programmatically with 📃[Fattura24](https://www.fattura24.com) APIs with node.js.

## Requisites
* node.js >= 8

## Usage
This module exposes an object you can interact to.

```js
var fattura24 = new Fattura24({ apiKey: 'weejeighaGushuz7Megeisheij6oogh3' });

fattura24.saveCustomer({
    CustomerName: 'MARIO ROSSI',
    CustomerAddress: 'Via Alberti 8',
    CustomerPostcode: '06122',
    CustomerCity: 'Perugia',
    CustomerProvince: 'PG',
    CustomerCountry: '',
    CustomerFiscalCode: 'MARROS66C44G217W',
    CustomerVatCode: '03912377542',
    CustomerCellPhone: '335123456789',
    CustomerEmail: 'info@rossi.it'
}).then(function( customer ) {
    console.log( customer );
}).catch(function( error ) {
    console.error( error );
});
```

## Methods
This module reflects **API version v0.3.3** methods. Further details are available on [official documentation](https://www.fattura24.com/api-documentazione/).

|Method   |Purpose   |
|---|---|
|testKey   |Verify that the ApiKey is valid   |
|saveCustomer   |Create a new customer   |
|saveDocument   |Create a document   |
|getFile   |Retrieve a document as PDF   |
|getTemplate   |Get a list of available custom document templates   |
|getPdc   |Get the chart of accounts   |
|getNumerator   |Get accounting branches   |
|getProduct   |Get a product or a service   |
|saveItem   |Create a credit   |

## CHANGELOG
#### v0.0.1 - 26/03/2018
Initial release.

## Author
[Enrico Deleo](https://enricodeleo.com)