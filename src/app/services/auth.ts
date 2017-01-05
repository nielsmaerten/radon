/// <reference path="../../../typings/index.d.ts" />
import * as firebase from 'firebase';
import * as Q from 'q';
import { FirebaseService } from './firebase';

export class AuthService {
  public isAuthenticated: boolean = false;
  public authPromise: Q.Promise<{}>;
  private auth: firebase.auth.Auth;

  /** @ngInject */
  constructor(FirebaseService: FirebaseService) {
    this.auth = FirebaseService.getAuth();
    let deferred = Q.defer();
    this.authPromise = deferred.promise;

    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        deferred.resolve();
      } else {
        this.isAuthenticated = false;
      }
    });
  }

  public getUserId() {
    return this.isAuthenticated /*&& this.auth.currentUser*/ ? this.auth.currentUser.uid : null;
  }

  public signIn() {
    this.auth.onAuthStateChanged(user => {
      if (!user) {
        let provider = new firebase.auth.GoogleAuthProvider();
        this.auth.signInWithRedirect(provider);
      }
    });
  }

  public signOut() {
    this.auth.signOut().then(() => {
      window.localStorage.clear();
      window.location.reload();
    });
  }
};
