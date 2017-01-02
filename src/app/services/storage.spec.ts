/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import { StorageService } from './storage';
import { FirebaseService } from './firebase';
import { AuthService } from './auth';
import { EncryptedStory } from '../model/radon';

describe('storage service', () => {
  let testDate = new Date(1880, 10, 10);
  let exampleStory = new EncryptedStory(testDate, '{\"iv\":\"d9bpnvgxYvMwKtxUWAjTsw==\",\"v\":1,\"iter\":10000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"ct\":\"rupx/JeVz5/JgR/6IzSN5LMrHa9qAw==\"}');
  beforeEach(done => {
    angular
      .module('app')
      .service('StorageService', StorageService)
      .service('AuthService', AuthService)
      .service('FirebaseService', FirebaseService)
      ;
    angular.mock.module('app');

    angular.mock.inject((AuthService: AuthService) => {
      AuthService.signIn();
      AuthService.authPromise.then(() => {
        done();
      });
    });
  });

  it('should save a story to firebase', done => angular.mock.inject((StorageService: StorageService) => {
    StorageService.fetchStory(testDate).then(() => {
      fail('A story already exists at date ' + testDate + '. No story should exist here before tests.');
    }).catch(error => {
      expect(error).toBeDefined();
      StorageService.saveStory(exampleStory);
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

  it('should set a salt', done => angular.mock.inject((StorageService: StorageService) => {
    StorageService.setSalt();
    StorageService.onSaltSet((salt: string) => {
      expect(salt.length).toBeGreaterThan(10);
      done();
    });
  }));
});
