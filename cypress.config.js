const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:4200', // Ensure this matches your service name and port
    supportFile: false, // Set to false if you do not have a support file
    defaultCommandTimeout: 100000, // Increase the timeout if necessary
  },
});
