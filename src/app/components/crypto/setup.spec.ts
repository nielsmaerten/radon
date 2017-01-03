/// <reference path="../../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import * as $ from 'jquery';
import { cryptoSetup } from './setup';

describe('crypto setup component', () => {
  beforeEach(() => {
    angular
      .module('appCryptoSetup', ['app/components/crypto/setup.html'])
      .component('appCryptoSetup', cryptoSetup);
    angular.mock.module('appCryptoSetup');
  });

  xit('should render 2 password fields', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $($compile('<app-crypto-setup></app-crypto-setup>')($rootScope));
    $rootScope.$digest();
    let selector = 'input[type="password"]';
    expect(element.find(selector).length).toBe(2);
  }));
});
