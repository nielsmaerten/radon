/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import { EncryptionService } from './encryption';
import { StorageService } from './storage';
import { EntropyService } from './entropy';
import { PlainStory, EncryptedStory } from '../model/radon';

describe('encryption service', () => {
  let testPassword: string = 'TESTPASSWORD';
  let testPlainStory: PlainStory = new PlainStory(new Date(), 'This is a test');

  beforeEach(() => {
    angular
      .module('app')
      .service('EncryptionService', EncryptionService)
      .service('StorageService', StorageService)
      .service('EntropyService', EntropyService)
      ;
    angular.mock.module('app');
  });

  it('should load encryption key', angular.mock.inject((EncryptionService: EncryptionService) => {
    expect(EncryptionService.isReady()).toBe(false);
    EncryptionService.loadEncryptionKey(testPassword);
    expect(EncryptionService.isReady()).toBe(true);
  }));

  it('should encrypt a story', angular.mock.inject((EncryptionService: EncryptionService) => {
    EncryptionService.loadEncryptionKey(testPassword);
    let encryptedStory: EncryptedStory = EncryptionService.encryptStory(testPlainStory);
    console.log('testPlainStory: ' + JSON.stringify(testPlainStory));
    console.log('encryptedStory: ' + JSON.stringify(encryptedStory));
    expect(encryptedStory.Contents).toBeDefined();
    expect(encryptedStory.Date).toBeDefined();
  }));

  it('should decrypt a story', angular.mock.inject((EncryptionService: EncryptionService) => {
    EncryptionService.loadEncryptionKey(testPassword);
    let encryptedStory: EncryptedStory = EncryptionService.encryptStory(testPlainStory);
    let decryptedStory: PlainStory = EncryptionService.decryptStory(encryptedStory);
    console.log('testPlainStory: ' + JSON.stringify(testPlainStory));
    console.log('encryptedStory: ' + JSON.stringify(encryptedStory));
    console.log('decryptedStory: ' + JSON.stringify(decryptedStory));
    expect(testPlainStory.Contents).toEqual(decryptedStory.Contents);
    expect(testPlainStory.Date).toEqual(decryptedStory.Date);
  }));
});
