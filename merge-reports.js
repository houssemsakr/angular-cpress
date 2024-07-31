const marge = require('mochawesome-merge');
const reportGenerator = require('mochawesome-report-generator');

marge.merge({
  reportsDir: 'cypress/reports',
  files: ['cypress/reports/*.json']
})
.then(report => {
  // Save the merged report
  return reportGenerator.create(report, {
    reportDir: 'cypress/reports',
    reportFilename: 'report'
  });
})
.catch(err => {
  console.error('Error merging reports:', err);
  process.exit(1);
});
