'use strict';

module.exports = function enableAuthentication(server) {
  // enable authentication
  console.log('Access Token check');
  server.enableAuth();
};
