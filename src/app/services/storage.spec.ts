/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import { StorageService } from './storage';
import { EncryptionService } from './encryption';
import { FirebaseService } from './firebase';
import { AuthService } from './auth';
import { PlainStory } from '../model/radon';

describe('storage service', () => {
  let testDate = new Date(1880, 10, 10);
  beforeEach(done => {
    angular
      .module('app')
      .service('StorageService', StorageService)
      .service('AuthService', AuthService)
      .service('FirebaseService', FirebaseService)
      .service('EncryptionService', EncryptionService);
    angular.mock.module('app');

    angular.mock.inject((EncryptionService: EncryptionService, AuthService: AuthService, StorageService: StorageService) => {
      var testSetup = () => {
        let plainStory = new PlainStory(testDate, 'This is a test');
        EncryptionService.loadEncryptionKey('testPassword');
        this.exampleStory = EncryptionService.encryptStory(plainStory);
        done();
      };

      AuthService.signIn();
      AuthService.authPromise.then(() => {
        StorageService.onSaltSet(() => {
          debugger;
          if (EncryptionService.hasSalt()) {
            testSetup();
          } else {
            StorageService.setSalt().then(testSetup);
          }
        });
      });
    });
  });

  it('should save a story to firebase', done => angular.mock.inject((StorageService: StorageService) => {
    StorageService.fetchStory(testDate).then(() => {
      fail('A story already exists at date ' + testDate + '. No story should exist here before tests.');
    }).catch(error => {
      expect(error).toBeDefined();
      StorageService.saveStory(this.exampleStory);
      done();
    });
  }));

  it('should fetch a story from firebase', done => angular.mock.inject((StorageService: StorageService) => {
    StorageService.fetchStory(testDate).then((story) => {
      expect(story).toBeDefined();
      done();
    }).catch(error => {
      throw error;
    });
  }));

  it('should delete a saved story from firebase', done => angular.mock.inject((StorageService: StorageService) => {
    StorageService.deleteStory(testDate).then(() => {
      StorageService.fetchStory(testDate).catch(error => {
        expect(error).toBeDefined();
        done();
      });
    });
  }));
});
