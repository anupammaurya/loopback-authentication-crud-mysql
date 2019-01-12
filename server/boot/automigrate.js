'use strict';

module.exports = function(app) {
  app.dataSources.inventory.autoupdate('book', err => {
    if (err) throw err;
    console.log('model synched!');
  });
};
