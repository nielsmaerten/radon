/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import { FirebaseService } from './firebase';

describe('firebase service', () => {
  beforeEach(done => {
    angular
      .module('app')
      .service('FirebaseService', FirebaseService);
    angular.mock.module('app');
    done();
  });

  it('should return an auth and database object', done => angular.mock.inject((FirebaseService: FirebaseService) => {
    expect(FirebaseService.getAuth()).toBeDefined();
    expect(FirebaseService.getDatabase()).toBeDefined();
    done();
  }));

});
