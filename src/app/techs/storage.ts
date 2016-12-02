/// <reference path="../../../typings/index.d.ts" />
import { EncryptedStory } from '../model/radon';
import { FirebaseService } from './firebase';
import { AuthService } from './auth';
import * as firebase from 'firebase';
import * as moment from 'moment';

export class StorageService {
  private database: firebase.database.Database;
  private AuthService: AuthService;


  /** @ngInject */
  constructor(FirebaseService: FirebaseService, AuthService: AuthService) {
    this.database = FirebaseService.getDatabase();
    this.AuthService = AuthService;
  }

  public saveStory(EncryptedStory: EncryptedStory) {
    let dateString = moment(EncryptedStory.Date).format('YYYYMMDD');
    let testUser = this.AuthService.getUserId();
    this.database.ref(`users/${testUser}/entries/${dateString}`).set(EncryptedStory);
  }
};
