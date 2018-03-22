const baseUrl = 'https://www.app.fattura24.com/api';
const defaultVersion = '0.3';

/**
 * Routes
 * Returns an object containing all the default routes to Fattura24's api.
 * 
 * @param {string} version API version code 
 */
module.exports = function routes(version) {
  const localVersion = version || defaultVersion;
  return {
    testKey: `${baseUrl}/v${localVersion}/TestKey`,
    saveCustomer: `${baseUrl}/v${localVersion}/SaveCustomer`,
    saveDocument: `${baseUrl}/v${localVersion}/SaveDocument`,
    getFile: `${baseUrl}/v${localVersion}/GetFile`,
    getTemplate: `${baseUrl}/v${localVersion}/GetTemplate`,
    getPdc: `${baseUrl}/v${localVersion}/GetPdc`,
    getNumerator: `${baseUrl}/v${localVersion}/GetNumerator`,
    getProduct: `${baseUrl}/v${localVersion}/GetProduct`,
    saveItem: `${baseUrl}/v${localVersion}/SaveItem`
  };
};
