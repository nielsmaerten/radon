/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';
import '../projection_theme/assets/js/util.js';
import '../projection_theme/assets/js/main.js';
import 'angular-ui-router';
import routesConfig from './routes';

import {main} from './app/main';
import {header} from './app/components/header';
import {banner} from './app/components/banner';
import {footer} from './app/components/footer';

import { emojiFilter, emojiDirective } from './app/filters/emoji';

import './index.scss';

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .filter('emoji', emojiFilter)
  .directive('emoji', emojiDirective)
  .component('app', main)
  .component('appHeader', header)
  .component('appBanner', banner)
  .component('appFooter', footer);
