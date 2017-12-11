/// <reference path="../../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import { storyRead } from './read';

describe('story read component', () => {
  beforeEach(() => {
    angular
      .module('appStoryRead', ['app/components/story/read.html'])
      .component('appStoryRead', storyRead);
    angular.mock.module('appStoryRead');
  });
});
