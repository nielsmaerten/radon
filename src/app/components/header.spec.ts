/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import { header } from './header';
import '../../../projection_theme/assets/js/util.js';
import { AuthService } from '../services/auth';
import { FirebaseService } from '../services/firebase';

describe('header component', () => {
  beforeEach(() => {
    angular
      .module('appHeader', ['app/components/header.html'])
      .service('AuthService', AuthService)
      .service('FirebaseService', FirebaseService)
      .component('appHeader', header);
    angular.mock.module('appHeader');
  });

  it('should render a menu', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<app-header></app-header>')($rootScope);
    $rootScope.$digest();
    const header = element.find('#navPanel');
    expect(header.children().length).toBeGreaterThan(0);
  }));
});
