/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import 'angular-ui-router';
import * as $ from 'jquery';
import { banner } from './banner';
import { AuthService } from '../services/auth';
import { EncryptionService } from '../services/encryption';
import { StorageService } from '../services/storage';
import { EntropyService } from '../services/entropy';
import { FirebaseService } from '../services/firebase';

describe('banner component', () => {
  beforeEach(() => {
    angular
      .module('appBanner', ['app/components/banner.html'])
      .service('AuthService', AuthService)
      .service('FirebaseService', FirebaseService)
      .service('EncryptionService', EncryptionService)
      .service('StorageService', StorageService)
      .service('EntropyService', EntropyService)
      .component('appBanner', banner);
    angular.mock.module('appBanner', 'ui.router');
  });

  it('should render a title', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $($compile('<app-banner></app-banner>')($rootScope));
    $rootScope.$digest();
    let selector = '#banner .inner header h1';
    expect(element.find(selector).length).toBeGreaterThan(0);
  }));
});
