'use strict';

module.exports = function enableAuthentication(server) {
  // enable authentication
  console.log('Access Token check');
  console.log(server.RemoteObjects);
  server.enableAuth();
};
