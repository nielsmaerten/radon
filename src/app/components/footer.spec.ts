/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import * as $ from 'jquery';
import { footer } from './footer';
import { AuthService } from '../services/auth';
import { FirebaseService } from '../services/firebase';

describe('footer component', () => {
  beforeEach(() => {
    angular
      .module('appFooter', ['app/components/footer.html'])
      .service('AuthService', AuthService)
      .service('FirebaseService', FirebaseService)
      .component('appFooter', footer);
    angular.mock.module('appFooter');
  });

  it('should render a copyright notice', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $($compile('<app-footer></app-footer>')($rootScope));
    $rootScope.$digest();
    let selector = '#footer .copyright';
    expect(element.find(selector).length).toBeGreaterThan(0);
  }));
});
