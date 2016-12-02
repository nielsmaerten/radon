/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import { StorageService } from './storage';
import { EncryptionService } from './encryption';
import { PlainStory, EncryptedStory } from '../model/radon';

describe('storage service', () => {
  let exampleStory: EncryptedStory;

  beforeEach(() => {
    angular
      .module('fountainTech', ['app/techs/tech.html'])
      .service('StorageService', StorageService)
      .service('EncryptionService', EncryptionService);
    angular.mock.module('fountainTech');

    angular.mock.inject((EncryptionService: EncryptionService) => {
      let plainStory = new PlainStory(new Date(), 'This is a test');
      EncryptionService.LoadEncryptionKey('testPassword');
      this.exampleStory = EncryptionService.EncryptStory(plainStory);
    });
  });

  it('should fetch a story from firebase', angular.mock.inject((StorageService: StorageService) => {
    StorageService.SaveStory(this.exampleStory);
  }));

  xit('should save a story to firebase', angular.mock.inject((StorageService: StorageService) => {
    //
  }));

  xit('should delete a saved story from database', angular.mock.inject((StorageService: StorageService) => {
    //
  }));
});
