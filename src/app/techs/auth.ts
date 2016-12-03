/// <reference path="../../../typings/index.d.ts" />
import * as firebase from 'firebase';
import { FirebaseService } from './firebase';

export class AuthService {
  private auth: firebase.auth.Auth;
  private $q: angular.IQService;


  /** @ngInject */
  constructor(FirebaseService: FirebaseService, $q: angular.IQService) {
    this.auth = FirebaseService.getAuth();
    this.$q = $q;

    /*this.auth.onAuthStateChanged(user => {
      if (!user) {
        this.signIn(); // todo: redirect to sign in page instead?
      }
    });*/
  }

  public getUserId() {
    return this.isAuthenticated() ? this.auth.currentUser.uid : null;
  }

  public isAuthenticated() {
    return this.auth.currentUser != null;
  }

  public signIn(): angular.IPromise<any> {
    let deferred = this.$q.defer();
    this.auth.onAuthStateChanged(user => {
      if (!user) {
        let provider = new firebase.auth.GoogleAuthProvider();
        this.auth.signInWithRedirect(provider);
      } else {
        console.log('1st hit');
        deferred.resolve(user);
      }
    });
    return deferred.promise;
  }
};
