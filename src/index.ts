/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';

import {techsModule} from './app/techs/index';
import 'angular-ui-router';
import routesConfig from './routes';

import {main} from './app/main';
import {header} from './app/components/header';
import {title} from './app/title';
import {footer} from './app/footer';

import './index.scss';

angular
  .module('app', [techsModule, 'ui.router'])
  .config(routesConfig)
  .component('app', main)
  .component('appHeader', header)
  .component('fountainTitle', title)
  .component('fountainFooter', footer);
