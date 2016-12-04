/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import * as $ from 'jquery';
import { banner } from './banner';

describe('banner component', () => {
  beforeEach(() => {
    angular
      .module('appBanner', ['app/components/banner.html'])
      .component('appBanner', banner);
    angular.mock.module('appBanner');
  });

  it('should render a title', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $($compile('<app-banner></app-banner>')($rootScope));
    $rootScope.$digest();
    let selector = '#banner .inner header h1';
    expect(element.find(selector).length).toBeGreaterThan(0);
  }));
});
