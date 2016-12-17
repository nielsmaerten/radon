/// <reference path="../../../typings/index.d.ts" />
import * as firebase from 'firebase';
import * as Q from 'q';
import { FirebaseService } from './firebase';

export class AuthService {
  public isAuthenticated: boolean;
  private auth: firebase.auth.Auth;

  /** @ngInject */
  constructor(FirebaseService: FirebaseService) {
    this.auth = FirebaseService.getAuth();

    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
    this.isAuthenticated = !this.auth.currentUser;
  }

  public getUserId() {
    return this.isAuthenticated /*&& this.auth.currentUser*/ ? this.auth.currentUser.uid : null;
  }

  public signIn(): Q.Promise<{}> {
    let deferred = Q.defer();
    this.auth.onAuthStateChanged(user => {
      if (user) {
        deferred.resolve();
      } else {
        let provider = new firebase.auth.GoogleAuthProvider();
        this.auth.signInWithRedirect(provider);
      }
    });
    return deferred.promise;
  }

  public signOut() {
    this.auth.signOut().then(() => {
      window.localStorage.clear();
      window.location.reload();
    });
  }
};
