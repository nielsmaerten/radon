/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import * as $ from 'jquery';
import { encryptionkeyForm } from './encryptionkey';
import { AuthService } from '../services/auth';
import { FirebaseService } from '../services/firebase';

describe('encryptionkey component', () => {
  beforeEach(() => {
    angular
      .module('appEncryptionkey', ['app/components/encryptionkey.html'])
      .service('AuthService', AuthService)
      .service('FirebaseService', FirebaseService)
      .component('appEncryptionkey', encryptionkeyForm);
    angular.mock.module('appEncryptionkey');
  });

  it('should render a password input field', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $($compile('<app-encryptionkey></app-encryptionkey>')($rootScope));
    $rootScope.$digest();
    let selector = 'input#encryptionkey[type=\'password\']';
    expect(element.find(selector).length).toBe(1);
  }));

  it('should render an unlock button', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $($compile('<app-encryptionkey></app-encryptionkey>')($rootScope));
    $rootScope.$digest();
    let selector = 'input[type=\'submit\']';
    expect(element.find(selector).length).toBe(1);
  }));
});
