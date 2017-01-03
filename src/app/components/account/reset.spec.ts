/// <reference path="../../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import * as $ from 'jquery';
import { accountReset } from './reset';

describe('account reset component', () => {
  beforeEach(() => {
    angular
      .module('appAccountReset', ['app/components/account/reset.html'])
      .component('appAccountReset', accountReset);
    angular.mock.module('appAccountReset');
  });

  xit('should render a reset button', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $($compile('<app-account-reset></app-account-reset>')($rootScope));
    $rootScope.$digest();
    let selector = 'button';
    expect(element.find(selector).length).toBeGreaterThan(0);
  }));
});
