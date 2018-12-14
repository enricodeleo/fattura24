# Fattura24 Node.js SDK

💻 Interact programmatically with 📃[Fattura24](https://www.fattura24.com) APIs with node.js.

## Offically recognized by Fattura24
[Original post](https://www.fattura24.com/node-js-modulo-fatturazione/)

## Usage
This module exposes an object you can interact to with all the supported methods of Fattura24's api.

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

## Note about new e-invoice (Fattura Elettronica)

When creating a fattura elettronica, please keep in mind to wrap following elements' strings between `<![CDATA[` and `]]`.

* CustomerName
* CustomerAddress
* Object
* Rows[].Row.Description

Example

```js
fattura24.saveDocument({
  TotalWithoutTax: 29.10,
  VatAmount: 0,
  DocumentType: 'FE',
  SendEmail: false,
  FeVatNature: 'N4',
  Object: '<![CDATA[Handmade products export]]',
  Total: 29.10,
  Payments: {
    Payment: {
      Date: '2018-12-14',
      Paid: true,
      Amount: 29.10
    }
  },
  CustomerName: '<![CDATA[Enrico Deleo]]',
  CustomerAddress: '<![CDATA[Via delle vie più belle, 1]]',
  CustomerPostcode: '00100',
  CustomerCity: 'Roma',
  CustomerCountry: 'Italy',
  CustomerFiscalCode: 'AAADDD00S00D00D',
  CustomerVatCode: '1234567890',
  CustomerCellPhone: '3331234567',
  CustomerEmail: 'mail@example.com',
  FootNotes: 'Grazie per aver acquistato da noi',
  Rows: [
    {
      Row: {
        Code: '001',
        Description: '<![CDATA[Wooden Chair]]',
        Price: 18.04,
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
#### v0.1.1 - 14/12/2018
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
[Enrico Deleo](https://enricodeleo.com)
