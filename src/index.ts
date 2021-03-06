/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';
import '../projection_theme/assets/js/util.js';
// import '../projection_theme/assets/js/main.js';
import 'angular-ui-router';
import 'angular-material';
import 'angular-sanitize';
import 'angular-material-calendar/dist/angular-material-calendar.js';
import 'trix/dist/trix.js';
import 'angular-trix/dist/angular-trix.js';
import routesConfig from './routes';

import { main } from './app/main';
import { rootController } from './app/root';
import { introduction } from './app/components/introduction';
import { header } from './app/components/header';
import { banner } from './app/components/banner';
import { footer } from './app/components/footer';
import { menuitems } from './app/components/menuitems';
import { accountReset } from './app/components/account/reset';
import { cryptoSetup } from './app/components/crypto/setup';
import { cryptoUnlock } from './app/components/crypto/unlock';
import { storyRead } from './app/components/story/read';
import { storyEdit } from './app/components/story/edit';
import { storyList } from './app/components/story/list';
import { calendar } from './app/components/story/calendar';

import { AuthService } from './app/services/auth';
import { FirebaseService } from './app/services/firebase';
import { EncryptionService } from './app/services/encryption';
import { StorageService } from './app/services/storage';
import { EntropyService } from './app/services/entropy';

import { emojiFilter, emojiDirective } from './app/filters/emoji';

import './index.scss';

angular
  .module('app', ['ui.router', 'ngMaterial', 'materialCalendar', 'angularTrix'])
  .config(routesConfig)
  .config(($mdThemingProvider) => {
    $mdThemingProvider
      .theme('default')
      .primaryPalette('grey');
  })
  .filter('emoji', emojiFilter)
  .directive('emoji', emojiDirective)
  .service('AuthService', AuthService)
  .service('FirebaseService', FirebaseService)
  .service('EncryptionService', EncryptionService)
  .service('StorageService', StorageService)
  .service('EntropyService', EntropyService)
  .component('app', main)
  .controller('rootController', rootController)
  .component('appIntroduction', introduction)
  .component('appHeader', header)
  .component('appBanner', banner)
  .component('appFooter', footer)
  .component('appMenuitems', menuitems)
  .component('appCalendar', calendar)
  .component('appAccountReset', accountReset)
  .component('appCryptoUnlock', cryptoUnlock)
  .component('appCryptoSetup', cryptoSetup)
  .component('appStoryRead', storyRead)
  .component('appStoryEdit', storyEdit)
  .component('appStoryList', storyList)
  ;
