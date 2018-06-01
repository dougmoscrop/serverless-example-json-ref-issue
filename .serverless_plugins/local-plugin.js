'use strict';

module.exports = class LogSubscriptionsPlugin {

  constructor(serverless) {
    this.provider = 'aws';
    this.serverless = serverless;
    this.hooks = {
      'aws:package:finalize:mergeCustomProviderResources': () => this.test()
    };
  }

  test() {
    const { service } = this.serverless;
    const { custom } = service;
    const { test } = custom;

    const template = service.provider.compiledCloudFormationTemplate;

    template.Resources['foo'] = {
      Type: 'Custom',
      Properties: { test }
    };

    template.Resources['bar'] = {
      Type: 'Custom',
      Properties: { test }
    };
  }

};
