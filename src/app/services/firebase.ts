/// <reference path="../../../typings/index.d.ts" />
import * as firebase from 'firebase';

export class FirebaseService {
  private _database: firebase.database.Database;
  private _auth: firebase.auth.Auth;


  /** @ngInject */
  constructor() {
    // initialize Firebase
    var config = {
      apiKey: 'AIzaSyCYrs-FOz-I4iF-vORTiX_KPDkux8LfdW4',
      authDomain: 'radon-ce805.firebaseapp.com',
      databaseURL: 'https://radon-ce805.firebaseio.com',
      storageBucket: 'radon-ce805.appspot.com',
      messagingSenderId: '570883459269'
    };
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }

    this._database = firebase.database();
    this._auth = firebase.auth();
  }

  public getAuth() {
    return this._auth;
  }

  public getDatabase() {
    return this._database;
  }
};
