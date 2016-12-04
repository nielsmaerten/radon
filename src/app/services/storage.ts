/// <reference path="../../../typings/index.d.ts" />
import { EncryptedStory } from '../model/radon';
import { FirebaseService } from './firebase';
import { AuthService } from './auth';
import * as firebase from 'firebase';
import * as moment from 'moment';
import * as Q from 'q';

export class StorageService {
  private database: firebase.database.Database;
  private authService: AuthService;
  private stories: any;


  /** @ngInject */
  constructor(FirebaseService: FirebaseService, AuthService: AuthService) {
    this.database = FirebaseService.getDatabase();
    this.authService = AuthService;
    this.stories = {};
  }

  public saveStory(story: EncryptedStory) {
    this.database.ref(this.getStoryRef(story.Date)).set(story);
  }

  public fetchStory(date: Date): Q.Promise<EncryptedStory> {
    let deferred = Q.defer<EncryptedStory>();
    let story = this.tryGetStoryFromCache(date);
    if (story) {
      deferred.resolve(story);
    } else {
      this.database.ref(this.getStoryRef(date)).on('value', snapshot => {
        if (snapshot.val() == null) {
          deferred.reject('No story available for this date');
        } else {
          let story: EncryptedStory = new EncryptedStory(date, snapshot.val().Contents);
          this.stories[this.getDateRef(story.Date)] = story;
          deferred.resolve(story);
        }
      });
    }
    return deferred.promise;
  }

  private tryGetStoryFromCache(date: Date) {
    return this.stories[this.getDateRef(date)];
  }

  private getStoryRef(storyDate: Date) {
    let dateRef = this.getDateRef(storyDate);
    let userId = this.authService.getUserId();
    return `users/${userId}/entries/${dateRef}`;
  }

  private getDateRef(date: Date) {
    return moment(date).format('YYYYMMDD');
  }
};
