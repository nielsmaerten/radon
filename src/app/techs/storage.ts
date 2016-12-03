/// <reference path="../../../typings/index.d.ts" />
import { EncryptedStory, Story } from '../model/radon';
import { FirebaseService } from './firebase';
import { AuthService } from './auth';
import * as firebase from 'firebase';
import * as moment from 'moment';

export class StorageService {
  private database: firebase.database.Database;
  private authService: AuthService;
  private $q: angular.IQService;
  private stories: any;


  /** @ngInject */
  constructor(FirebaseService: FirebaseService, AuthService: AuthService, $q: angular.IQService) {
    this.database = FirebaseService.getDatabase();
    this.authService = AuthService;
    this.$q = $q;
    this.stories = {};
  }

  public saveStory(story: EncryptedStory) {
    this.database.ref(this.getStoryRef(story.Date)).set(story);
  }

  public fetchStory(date: Date): angular.IPromise<EncryptedStory> {
    let deferred: angular.IDeferred<EncryptedStory> = this.$q.defer<EncryptedStory>();
    let story = this.tryGetStoryFromCache(date);
    if (story) {
      deferred.resolve(story);
    } else {
      this.database.ref(this.getStoryRef(date)).on('value', snapshot => {
        let story: EncryptedStory = snapshot.val();
        this.stories[this.getDateRef(story.Date)] = story;
        deferred.resolve(story);
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
