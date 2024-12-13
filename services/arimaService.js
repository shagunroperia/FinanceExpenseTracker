const http = require('http');

const getArimaForecast = async (inputData) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5002,
      path: '/predict',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(inputData)),
      },
    };

    const req = http.request(options, (res) => {
      let data = '';

      // Collect data chunks
      res.on('data', (chunk) => {
        data += chunk;
      });

      // Resolve promise on end
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject('Error parsing response: ' + error.message);
        }
      });
    });

    req.on('error', (error) => {
      reject('Error with HTTP request: ' + error.message);
    });

    // Write data to request body
    req.write(JSON.stringify(inputData));
    req.end(); // End the request
  });
};

module.exports = { getArimaForecast };
