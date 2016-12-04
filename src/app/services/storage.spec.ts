/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import { StorageService } from './storage';
import { EncryptionService } from './encryption';
import { FirebaseService } from './firebase';
import { AuthService } from './auth';
import { PlainStory } from '../model/radon';

describe('storage service', () => {
  beforeEach(done => {
    angular
      .module('app')
      .service('StorageService', StorageService)
      .service('AuthService', AuthService)
      .service('FirebaseService', FirebaseService)
      .service('EncryptionService', EncryptionService);
    angular.mock.module('app');

    angular.mock.inject((EncryptionService: EncryptionService, AuthService: AuthService, StorageService: StorageService) => {
      let plainStory = new PlainStory(new Date(), 'This is a test');
      EncryptionService.loadEncryptionKey('testPassword');
      this.exampleStory = EncryptionService.encryptStory(plainStory);
      AuthService.signIn().then(done);
    });
  });

  it('should fetch a story from firebase', done => angular.mock.inject((StorageService: StorageService) => {
    StorageService.fetchStory(new Date()).then((story) => {
      expect(story).toBeDefined();
      done();
    }).catch(error => {
      throw error;
     });
  }));

  it('should save a story to firebase', angular.mock.inject((StorageService: StorageService) => {
    StorageService.saveStory(this.exampleStory);
  }));

  xit('should delete a saved story from firebase', angular.mock.inject((StorageService: StorageService) => {
    //
  }));
});
