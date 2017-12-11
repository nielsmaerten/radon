/// <reference path="../../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import { storyEdit } from './edit';

describe('story edit component', () => {
  beforeEach(() => {
    angular
      .module('appStoryEdit', ['app/components/story/edit.html'])
      .component('appStoryEdit', storyEdit);
    angular.mock.module('appStoryEdit');
  });
});
