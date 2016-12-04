/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import * as $ from 'jquery';
import { footer } from './footer';

describe('footer component', () => {
  beforeEach(() => {
    angular
      .module('appFooter', ['app/components/footer.html'])
      .component('appFooter', footer);
    angular.mock.module('appFooter');
  });

  xit('should render a title', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $($compile('<app-footer></app-footer>')($rootScope));
    $rootScope.$digest();
    let selector = '#footer .inner header h1';
    expect(element.find(selector).length).toBeGreaterThan(0);
  }));
});
