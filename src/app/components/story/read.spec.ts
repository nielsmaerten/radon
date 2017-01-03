/// <reference path="../../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import * as $ from 'jquery';
import { storyRead } from './read';

describe('story read component', () => {
  beforeEach(() => {
    angular
      .module('appStoryRead', ['app/components/story/read.html'])
      .component('appStoryRead', storyRead);
    angular.mock.module('appStoryRead');
  });

  xit('should render a date', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $($compile('<app-story-read></app-story-read>')($rootScope));
    $rootScope.$digest();
    let selector = '#date';
    expect(element.find(selector).length).toBe(1);
  }));
});
