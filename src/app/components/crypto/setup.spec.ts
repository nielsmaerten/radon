/// <reference path="../../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import 'angular-ui-router';
import * as $ from 'jquery';
import { cryptoSetup } from './setup';
import { StorageService } from '../../services/storage';
import { FirebaseService } from '../../services/firebase';
import { EncryptionService } from '../../services/encryption';
import { EntropyService } from '../../services/entropy';
import { AuthService } from '../../services/auth';

describe('crypto setup component', () => {
  beforeEach(() => {
    angular
      .module('appCryptoSetup', ['app/components/crypto/setup.html'])
      .service('StorageService', StorageService)
      .service('FirebaseService', FirebaseService)
      .service('EncryptionService', EncryptionService)
      .service('EntropyService', EntropyService)
      .service('AuthService', AuthService)
      .component('appCryptoSetup', cryptoSetup);
    angular.mock.module('appCryptoSetup', 'ui.router');
  });

  it('should render 2 password fields', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $($compile('<app-crypto-setup></app-crypto-setup>')($rootScope));
    $rootScope.$digest();
    let selector = 'input[type="password"]';
    expect(element.find(selector).length).toBe(2);
  }));
});
