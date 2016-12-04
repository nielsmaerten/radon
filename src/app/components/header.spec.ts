/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import {header} from './header';

describe('header component', () => {
  beforeEach(() => {
    angular
      .module('appHeader', ['app/components/header.html'])
      .component('appHeader', header);
    angular.mock.module('appHeader');
  });

  it('should render a menu', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<app-header></app-header>')($rootScope);
    $rootScope.$digest();
    const header = element.find('nav');
    expect(header.children().length).toBeGreaterThan(0);
  }));
});
