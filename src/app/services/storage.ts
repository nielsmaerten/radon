/// <reference path="../../../typings/index.d.ts" />
import { EncryptedStory } from '../model/radon';
import { FirebaseService } from './firebase';
import { EntropyService } from './entropy';
import { AuthService } from './auth';
import * as firebase from 'firebase';
import * as moment from 'moment';
import * as Q from 'q';
import * as sjcl from 'sjcl';

export class StorageService {
  private database: firebase.database.Database;
  private entropyService: EntropyService;
  private authService: AuthService;
  private stories: any;


  /** @ngInject */
  constructor(FirebaseService: FirebaseService, AuthService: AuthService, EntropyService: EntropyService) {
    this.database = FirebaseService.getDatabase();
    this.authService = AuthService;
    this.entropyService = EntropyService;
    this.stories = {};
  }

  public onSet(shortReference: string, callback: Function) {
    this.getCustomRef(shortReference).then(ref => {
      this.database.ref(ref)
        .on('value', snapshot => callback(snapshot.val()));
    });
  }

  /**
   * @deprecated use onSet('salt') instead
   */
  public onSaltSet(cb: Function) {
    this.onSet('salt', cb);
  }

  public setPassphrase(passphrase: string): Q.Promise<{}> {
    let deferred = Q.defer();
    // verify the salt hasn't been set yet
    this.getCustomRef('').then(ref => {
      this.database.ref(ref + '/salt').once('value', snapshot => {
        if (snapshot.val()) {
          deferred.reject('Salt already set');
        } else {
          this.entropyService.generateSalt().then(salt => {
            let hash = sjcl.hash.sha256.hash(passphrase + salt);
            let hashPromise = this.database.ref(ref + '/hash').set(hash);
            let saltPromise = this.database.ref(ref + '/salt').set(salt);
            Q.all([hashPromise, saltPromise]).then(deferred.resolve);
          });
        }
      });
    });
    return deferred.promise;
  }

  public saveStory(story: EncryptedStory) {
    this.database.ref(this.getStoryRef(story.Date)).set(story);
    this.stories[this.getDateRef(story.Date)] = story;
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

  public deleteStory(date: Date): firebase.Promise<any> {
    this.stories[this.getDateRef(date)] = undefined;
    return this.database.ref(this.getStoryRef(date)).remove();
  }

  private tryGetStoryFromCache(date: Date) {
    return this.stories[this.getDateRef(date)];
  }

  private getStoryRef(storyDate: Date) {
    let dateRef = this.getDateRef(storyDate);
    let userId = this.authService.getUserId();
    return `users/${userId}/entries/${dateRef}`;
  }

  private getCustomRef(ref: string): Q.Promise<string> {
    let deferred = Q.defer<string>();
    this.authService.authPromise.then(() => {
      let userId = this.authService.getUserId();
      deferred.resolve(`users/${userId}/${ref}`);
    });
    return deferred.promise;
  }

  private getDateRef(date: Date) {
    return moment(date).format('YYYYMMDD');
  }
};
