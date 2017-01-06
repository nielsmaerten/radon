/// <reference path="../../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import 'angular-ui-router';
import * as $ from 'jquery';
import { calendar } from './calendar';
import { AuthService } from '../../services/auth';
import { EncryptionService } from '../../services/encryption';
import { StorageService } from '../../services/storage';
import { EntropyService } from '../../services/entropy';
import { FirebaseService } from '../../services/firebase';

describe('calendar component', () => {
  beforeEach(() => {
    angular
      .module('appCalendar', ['app/components/story/calendar.html'])
      .service('AuthService', AuthService)
      .service('FirebaseService', FirebaseService)
      .service('EncryptionService', EncryptionService)
      .service('StorageService', StorageService)
      .service('EntropyService', EntropyService)
      .component('appCalendar', calendar);
    angular.mock.module('appCalendar', 'ui.router');
  });

  it('should render the calendar', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $($compile('<app-calendar></app-calendar>')($rootScope));
    $rootScope.$digest();
    let selector = 'calendar-md';
    expect(element.find(selector).length).toBe(1);
  }));
});
