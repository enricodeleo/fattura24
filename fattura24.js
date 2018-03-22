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

const MODULE_VERSION = '0.0.2';
const API_VERSION = '0.3';
const F24_HOST = 'www.app.fattura24.com';

const routes = require('./lib/routes');
const convert = require('xml-js');
const https = require('https');
const querystring = require('querystring');
 
/**
 * Fattura24
 * Constructor function
 * 
 * @param {object} options  
 */
function Fattura24(options, propKeys) {
  const { apiKey, version } = options || {};
  let self = this;

  // Api Key is mandatory
  if (!apiKey) {
    throw new Error('You must specify an apiKey');
  }

  // Enforce `new`
  if (this instanceof Fattura24 === false) {
    return new Fattura24(options);
  }

  // Api Key
  this.apiKey = apiKey;

  // Expose current module version
  this.moduleVersion = MODULE_VERSION;
  
  // Expose current api version
  this.apiVersion = version || API_VERSION;

  const handler = {
    /**
     * This function is called whenever any property on the Proxy 
     * is called.
     * 
     * @param target the "parent" object; the object the proxy 
     *        virtualizes
     * @param prop the property called on the Proxy
     */
    get: function (target, prop) {    
      // This will return the property on the "parent" object
      if (prop in target) return target[prop];

      if (!routes[prop]) throw new Error(`The method ${prop} doesn't exists`);

      // No defined property, go on with magic method
      return (...args) => {
        return target.makeCall(prop, ...args);
      }
    }
  };

  // Using proxy we reach a behavior close to php's magic methods 
  return new Proxy(this, handler);
}

/**
 * defaultObject
 * Default object where we will inject payloads
 */
Fattura24.prototype.defaultObject = {
  Fattura24: {
    Document: {}
  }
};

/**
 * prepareXml
 * Prepare the data object to xml
 * 
 * @param {object} data 
 */
Fattura24.prototype.prepareXml = function prepareXml(data) {
  let response;

  try {
    let body = Object.assign({}, this.defaultObject);
    body.Fattura24.Document = data;
    response = convert.js2xml(body, { spaces: 0, compact: true });
  } catch (error) {
    throw new Error(error);
  }

  return response;
};

/**
 * prepareResponse
 * Prepare the response object from xml
 * 
 * @param {object} data 
 */
Fattura24.prototype.prepareResponse = function prepareResponse(data) {
  let result = {};
  
  try {
    let response = convert.xml2js(data, { compact: true, ignoreComment: true, textKey: 'text' });
    result = this.flatObject(response.root);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

Fattura24.prototype.flatObject = function flatObject(object) {
  let flatten = {};

  for (const key in object) {
    if (!object[key].text) {
      flatten[key] = this.flatObject(object[key]);
    } else {
      flatten[key] = object[key].text;
    }
  }

  return flatten;
};

/**
 * makeCall
 * Perform the actual call to Fattura24
 * 
 * @param {string} endpoint 
 * @param {object} body 
 */
Fattura24.prototype.makeCall = function makeCall(endpoint, body) {
  const self = this;
  const postData = querystring.stringify({
    apiKey: self.apiKey,
    xml: self.prepareXml(body)
  });
  console.log(self.prepareXml(body));
  const postOptions = {
    host: F24_HOST,
    port: '443',
    path: `/api/v${self.apiVersion}/${routes[endpoint]}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  // Set up the request
  return new Promise(function (resolve, reject) {
    let req = https.request(postOptions, (res) => {
      res.setEncoding('utf8');

      // Response is in chunks
      let response = ''
      res.on('data', function (chunk) {
        response += chunk;
      });

      // Done
      res.on('end', function () {
        const result = self.prepareResponse(response);
        return resolve(result);
      });

      // If error in response 
      res.on('error', function (err) {
        return reject(err);
      });
    });

    // req error
    req.on('error', function (err) {
      return reject(err);
    });

    // Send POST data
    req.write(postData);
    req.end();
  });
};

/**
 * Export Fattura24 module
 */
module.exports = Fattura24;
