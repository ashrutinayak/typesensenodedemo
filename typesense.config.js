const typesense = require('typesense');

const typesenseClient = new typesense.Client({
    nodes: [
      {
          host: '9oc75vqt134bxfudp-1.a1.typesense.net',
          port: 443,      
          protocol: 'https',
      },
    ],
    apiKey: 'KrdDbXw7wn8FwPvbBERl7ScE10g2Tbrr',
    connectionTimeoutSeconds: 2,
});

module.exports = typesenseClient;