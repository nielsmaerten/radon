/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import { EncryptionService } from './encryption';
import { PlainStory, EncryptedStory } from '../model/radon';

describe('encryption service', () => {
  let testPassword: string = 'TESTPASSWORD';
  let testPlainStory: PlainStory = new PlainStory(new Date(), 'This is a test');

  beforeEach(() => {
    angular
      .module('fountainTech', ['app/techs/tech.html'])
      .service('EncryptionService', EncryptionService);
    angular.mock.module('fountainTech');
  });

  it('should load encryption key', angular.mock.inject((EncryptionService: EncryptionService) => {
    expect(EncryptionService.isReady()).toBe(false);
    EncryptionService.loadEncryptionKey(testPassword);
    expect(EncryptionService.isReady()).toBe(true);
  }));

  it('should encrypt a story', angular.mock.inject((EncryptionService: EncryptionService) => {
    EncryptionService.loadEncryptionKey(testPassword);
    let encryptedStory: EncryptedStory = EncryptionService.encryptStory(testPlainStory);
    expect(encryptedStory.Contents).toBeDefined();
    expect(encryptedStory.Date).toBeDefined();
  }));

  it('should decrypt a story', angular.mock.inject((EncryptionService: EncryptionService) => {
    EncryptionService.loadEncryptionKey(testPassword);
    let encryptedStory: EncryptedStory = EncryptionService.encryptStory(testPlainStory);
    let decryptedStory: PlainStory = EncryptionService.decryptStory(encryptedStory);
    expect(testPlainStory.Contents).toEqual(decryptedStory.Contents);
    expect(testPlainStory.Date).toEqual(decryptedStory.Date);
  }));
});
