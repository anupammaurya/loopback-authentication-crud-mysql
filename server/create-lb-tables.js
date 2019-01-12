'use strict';
var server = require('./server');
var ds = server.dataSources.inventory;
var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Looback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});

ds.automigrate('People', function(err) {
  server.models.People.create([{
    name: 'Luke Skywalker',
    height: 172,
    mass: 77,
    gender: 'Male',
  }, {
    name: 'C-3PO',
    height: 167,
    mass: 75,
    gender: 'Undetermined',
  }], function(err, People) {
    if (err) throw err;
    console.log('Models created: \n', People);
  });
});
