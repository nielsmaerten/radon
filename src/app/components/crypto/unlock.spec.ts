/// <reference path="../../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import * as $ from 'jquery';
import { cryptoUnlock } from './unlock';

describe('crypto unlock component', () => {
  beforeEach(() => {
    angular
      .module('appCryptoUnlock', ['app/components/crypto/unlock.html'])
      .component('appCryptoUnlock', cryptoUnlock);
    angular.mock.module('appCryptoUnlock');
  });

  xit('should render a password field', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $($compile('<app-crypto-unlock></app-crypto-unlock>')($rootScope));
    $rootScope.$digest();
    let selector = 'input[type="password"]';
    //expect(element.find(selector).length).toBe(1);
  }));
});
