'use strict';

const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '.serverless', 'cloudformation-template-update-stack.json');
const contents = fs.readFileSync(templatePath);
const template = JSON.parse(contents);

if (template.Resources.bar.Properties.test === template.Resources.foo.Properties.test) {
  console.log('Looks good!');
} else {
  console.error('json-cycle produced invalid CloudFormation syntax!');
  process.exitCode = -1;
}