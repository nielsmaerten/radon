/// <reference path="../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import * as $ from 'jquery';
import {main} from './main';
import {AuthService} from './services/auth';
import {FirebaseService} from './services/firebase';

describe('main component', () => {
  beforeEach(() => {
    angular
      .module('app', ['app/main.html'])
      .service('AuthService', AuthService)
      .service('FirebaseService', FirebaseService)
      .component('app', main);
    angular.mock.module('app');
  });

  it('should render the header component', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $($compile('<app></app>')($rootScope));
    $rootScope.$digest();
    expect(element.find('app-header').length).toBeGreaterThan(0);
  }));

  it('should render the footer component', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $($compile('<app></app>')($rootScope));
    $rootScope.$digest();
    expect(element.find('app-footer').length).toBeGreaterThan(0);
  }));

  it('should render the banner component', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $($compile('<app></app>')($rootScope));
    $rootScope.$digest();
    expect(element.find('app-banner').length).toBeGreaterThan(0);
  }));
});
