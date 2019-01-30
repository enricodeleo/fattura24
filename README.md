# Fattura24 Node.js SDK

💻 Interact programmatically with 📃[Fattura24](https://www.fattura24.com) APIs with node.js.

## Offically recognized by Fattura24
[Original post](https://www.fattura24.com/node-js-modulo-fatturazione/)

## You don't have a Fattura24 account, yet?

[![Fattura24](http://www.fattura24.com/banner/fattura24_640x200.jpg)](http://www.fattura24.com/?src=ab80977)

## Usage
This module exposes an object you can interact to with all the supported methods of Fattura24's api.

### Create a new customer

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


#### Create a new customer with special chars

In case of special chars, like the ampersand (&) Fattura24 requires to escape them in an XML cdata.
One way to do it is to pass a subobject with the _cdata field to the properties.

Right now the project automatically converts the _cdata returning from the xml, but doesn't autoconvert properties while
sending them, therefore it's advised to add the _cdata in all needed fields.

Example:
```js
var fattura24 = new Fattura24({ apiKey: 'weejeighaGushuz7Megeisheij6oogh3' });

fattura24.saveCustomer({
    CustomerName: { _cdata: 'MARIO ROSSI & Figli' },
    CustomerAddress: { _cdata: 'Via Alberti 8' },
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

### Create a new invoice

```js
var fattura24 = new Fattura24({ apiKey: 'weejeighaGushuz7Megeisheij6oogh3' });

fattura24.saveDocument({
  TotalWithoutTax: 29.10,
  VatAmount: 0,
  DocumentType: 'FE',
  SendEmail: false,
  FeVatNature: 'N4',
  Object: 'Handmade products export',
  Total: 29.10,
  Payments: {
    Payment: {
      Date: '2018-12-14',
      Paid: true,
      Amount: 29.10
    }
  },
  CustomerName: 'John Doe',
  CustomerAddress: '29, 5th Avenue',
  CustomerPostcode: 'AA12345',
  CustomerCity: 'NYC',
  CustomerCountry: 'USA',
  CustomerCellPhone: '+15551234567',
  CustomerEmail: 'mail@example.com',
  FootNotes: 'Grazie per aver acquistato da noi',
  Rows: [
    {
      Row: {
        Code: '001',
        Description: 'Wooden Chair',
        Price: 29.10,
        VatCode: 0,
        VatDescription: '0%',
        Qty: 1
      },
    },
  ],
})
.then(console.log)
.catch(console.log);
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
#### v0.2.1 - 31/01/2019
Fix for non-xml parameters such as in /getFile and /GetProduct

#### v0.2.0 - 30/01/2019
Support for <![CDATA[ fields

#### v0.1.3 - 21/12/2018
[New License](https://creativecommons.org/licenses/by-nc/4.0/) added.

#### v0.1.2 - 14/12/2018
Update README.

#### v0.1.0 - 14/12/2018
Update dependencies with security fixes.

#### v0.0.7 - 25/03/2018
Do not throw error when unknown method is invoked.

#### v0.0.6 - 25/03/2018
Fixed an issue with npm publication.

#### v0.0.5 - 25/03/2018
Transpile es6 to es5 for wider nodejs compatibility (babel targeted to 4.0.0).

#### v0.0.2 - 22/03/2018
Initial release.

## Author
[Enrico Deleo](https://enricodeleo.com/)

## Contributors
[Andrea Grassi](http://andreagrassi.me/)