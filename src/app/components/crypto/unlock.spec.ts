/// <reference path="../../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import 'angular-ui-router';
import * as $ from 'jquery';
import { cryptoUnlock } from './unlock';
import { AuthService } from '../../services/auth';
import { EncryptionService } from '../../services/encryption';
import { StorageService } from '../../services/storage';
import { EntropyService } from '../../services/entropy';
import { FirebaseService } from '../../services/firebase';

describe('crypto unlock component', () => {
  beforeEach(() => {
    angular
      .module('appCryptoUnlock', ['app/components/crypto/unlock.html'])
      .component('appCryptoUnlock', cryptoUnlock)
      .service('AuthService', AuthService)
      .service('FirebaseService', FirebaseService)
      .service('EncryptionService', EncryptionService)
      .service('StorageService', StorageService)
      .service('EntropyService', EntropyService)
      ;
    angular.mock.module('appCryptoUnlock', 'ui.router');
  });

  it('should render a password field', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $($compile('<app-crypto-unlock></app-crypto-unlock>')($rootScope));
    $rootScope.$digest();
    let selector = 'input[type="password"]';
    expect(element.find(selector).length).toBe(1);
  }));
});
