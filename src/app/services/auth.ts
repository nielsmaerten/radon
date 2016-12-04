/// <reference path="../../../typings/index.d.ts" />
import * as firebase from 'firebase';
import * as Q from 'q';
import { FirebaseService } from './firebase';

export class AuthService {
  private auth: firebase.auth.Auth;


  /** @ngInject */
  constructor(FirebaseService: FirebaseService) {
    this.auth = FirebaseService.getAuth();

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

  public signIn(): Q.Promise<{}> {
    let deferred = Q.defer();
    this.auth.onAuthStateChanged(user => {
      if (!user) {
        let provider = new firebase.auth.GoogleAuthProvider();
        this.auth.signInWithRedirect(provider);
      } else {
        deferred.resolve();
      }
    });
    return deferred.promise;
  }
};
