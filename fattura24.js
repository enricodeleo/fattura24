/**
 * An API client for Fattura24
 *
 * @example
 *     var fattura24 = new Fattura24({ version: '0.3', apiKey: 'AiThae5peeph9aGhie1keeX9thuse1sh' });
 *     fattura24.posts({
 *        CustomerName: 'MARIO ROSSI',
 *        CustomerAddress: 'Via Alberti 8',
 *        CustomerPostcode: '06122',
 *        CustomerCity: 'Perugia',
 *        CustomerProvince: 'PG',
 *        CustomerCountry: '',
 *        CustomerFiscalCode: 'MARROS66C44G217W',
 *        CustomerVatCode: '03912377542',
 *        CustomerCellPhone: '335123456789',
 *        CustomerEmail: 'info@rossi.it'
 *     }).then(function( posts ) {
 *         console.log( posts );
 *     }).catch(function( error ) {
 *         console.error( error );
 *     });
 *
 * @license MIT
 })
 */
'use strict';

const CURRENT_MODULE_VERSION = '0.0.1';
const CURRENT_API_VERSION = '0.3';

const routes = require('./lib/routes')(CURRENT_API_VERSION);
var convert = require('xml-js');
var http = require('http');

const example = `
<root>
  <returnCode>0</returnCode>
  <description>Operazione completata con successo</description>
  <docId>953921</docId>
  <docNumber>01/YYYY</docNumber>
</root>
`;

const example2 = {
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
};


// try {
  //   let response = convert.xml2js(example, { compact: true, spaces: 4, trim: true, ignoreComment: true, nativeType: true, textKey: 'text' });
  //   let result = {};
  //   for (const key in response.root) {
    //       result[key] = response.root[key].text;
    //   }
    //   console.log(result);
    // } catch (error) {
      //   console.log(error);
      // }
      
// try {
//   let body = Object.assign({}, xmlWrapObj);
//   body.Fattura24.Document = example2;
//   let response = convert.js2xml(body, { spaces: 4, compact: true });
//   console.log(response);
// } catch (error) {
//   console.log(error);
// }

/**
 * Fattura24
 * 
 * Constructor function
 * @param {object} options  
 */
function Fattura24(options) {
  const { apiKey, version } = options || {};

  if (!apiKey) {
    throw new Error('You must specify an apiKey');
  }

  // Enforce `new`
  if (this instanceof Fattura24 === false) {
    return new Fattura24(options);
  }

  // Expose current module version
  this.moduleVersion = CURRENT_MODULE_VERSION;
  
  // Expose current api version
  this.apiVersion = version || CURRENT_API_VERSION;

}

/**
 * defaultObject
 * 
 * Default object where we will inject payloads
 */
Fattura24.prototype.defaultObject = {
  Fattura24: {
    Document: {}
  }
};

/**
 * prepareXml
 * 
 * Prepare the data object to xml
 * @param {object} data 
 */
Fattura24.prototype.prepareXml = function prepareXml(data) {
  try {
    let body = Object.assign({}, xmlWrapObj);
    body.Fattura24.Document = example2;
    let response = convert.js2xml(body, { spaces: 0, compact: true });
  } catch (error) {
    throw new Error(error);
  }

  return response;
};

const fattura24 = new Fattura24({ apiKey: 'C0EmQBIsThBF7q0wb5LImsvX1NdS9hee' });

console.log(fattura24);