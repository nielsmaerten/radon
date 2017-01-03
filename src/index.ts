/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';
import '../projection_theme/assets/js/util.js';
// import '../projection_theme/assets/js/main.js';
import 'angular-ui-router';
import routesConfig from './routes';

import { main } from './app/main';
import { header } from './app/components/header';
import { banner } from './app/components/banner';
import { footer } from './app/components/footer';
import { accountReset } from './app/components/account/reset';
import { cryptoSetup } from './app/components/crypto/setup';
import { cryptoUnlock } from './app/components/crypto/unlock';
import { storyRead } from './app/components/story/read';

import { AuthService } from './app/services/auth';
import { FirebaseService } from './app/services/firebase';
import { EncryptionService } from './app/services/encryption';
import { StorageService } from './app/services/storage';

import { emojiFilter, emojiDirective } from './app/filters/emoji';

import './index.scss';

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .filter('emoji', emojiFilter)
  .directive('emoji', emojiDirective)
  .service('AuthService', AuthService)
  .service('FirebaseService', FirebaseService)
  .service('EncryptionService', EncryptionService)
  .service('StorageService', StorageService)
  .component('app', main)
  .component('appHeader', header)
  .component('appBanner', banner)
  .component('appFooter', footer)
  .component('appAccountReset', accountReset)
  .component('appCryptoUnlock', cryptoUnlock)
  .component('appCryptoSetup', cryptoSetup)
  .component('appStoryRead', storyRead)
  ;
