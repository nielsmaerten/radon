/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import { EncryptionService } from './encryption';
import { PlainStory, EncryptedStory } from '../model/radon';

describe('encryption service', () => {
  beforeEach(() => {
    angular
      .module('fountainTech', ['app/techs/tech.html'])
      .service('EncryptionService', EncryptionService);
    angular.mock.module('fountainTech');
  });

  it('should load encryption key using a provided password', angular.mock.inject((EncryptionService: EncryptionService) => {
    let password = 'test';
    expect(EncryptionService.IsReady()).toBe(false);
    EncryptionService.LoadEncryptionKey(password);
    expect(EncryptionService.IsReady()).toBe(true);
  }));

  it('should encrypt a story', angular.mock.inject((EncryptionService: EncryptionService) => {
    EncryptionService.LoadEncryptionKey('test');
    let date = new Date();
    let contents = 'This is a test';
    let story: PlainStory = new PlainStory(date, contents);
    let encryptedStory: EncryptedStory = EncryptionService.EncryptStory(story);
    expect(encryptedStory.Contents).toBeDefined();
    expect(encryptedStory.Date).toBeDefined();
  }))
});
