/// <reference path="../../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import * as $ from 'jquery';
import { calendar } from './calendar';

describe('calendar component', () => {
  beforeEach(() => {
    angular
      .module('appCalendar', ['app/components/story/calendar.html'])
      .component('appCalendar', calendar);
    angular.mock.module('appCalendar');
  });

  xit('should do stuff', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $($compile('<app-calendar></app-calendar>')($rootScope));
    $rootScope.$digest();
    let selector = '#date';
    // look at another test...
  }));
});
