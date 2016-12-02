/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import { StorageService } from './storage';
import { EncryptionService } from './encryption';
import { FirebaseService } from './firebase';
import { AuthService } from './auth';
import { PlainStory, EncryptedStory } from '../model/radon';

describe('storage service', () => {
  let exampleStory: EncryptedStory;

  beforeEach(() => {
    angular
      .module('fountainTech', ['app/techs/tech.html'])
      .service('StorageService', StorageService)
      .service('AuthService', AuthService)
      .service('FirebaseService', FirebaseService)
      .service('EncryptionService', EncryptionService);
    angular.mock.module('fountainTech');

    angular.mock.inject((EncryptionService: EncryptionService) => {
      let plainStory = new PlainStory(new Date(), 'This is a test');
      EncryptionService.loadEncryptionKey('testPassword');
      this.exampleStory = EncryptionService.encryptStory(plainStory);
    });
  });

  xit('should fetch a story from firebase', angular.mock.inject((StorageService: StorageService) => {
    //
  }));

  it('should save a story to firebase', angular.mock.inject((StorageService: StorageService) => {
    debugger;
    StorageService.saveStory(this.exampleStory);
  }));

  xit('should delete a saved story from database', angular.mock.inject((StorageService: StorageService) => {
    //
  }));
});
