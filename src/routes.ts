/// <reference path="../typings/index.d.ts" />

export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider, $locationProvider: angular.ILocationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      component: 'app'
    })
    .state('app.home', {
      component: 'appBanner',
      url: '/'
    })
    .state('app.cryptoSetup', {
      component: 'appCryptoSetup',
      url: '/crypto/setup'
    })
    .state('app.cryptoUnlock', {
      component: 'appCryptoUnlock',
      url: '/crypto/unlock'
    })
    .state('app.accountReset', {
      component: 'appAccountReset',
      url: '/account/reset'
    })
    .state('app.storyRead', {
      component: 'appStoryRead',
      url: '/story/:storyDate'
    })
    .state('app.storyEdit', {
      component: 'appStoryEdit',
      url: '/story/:storyDate/edit'
    })
    .state('app.calendar', {
      component: 'appCalendar',
      url: '/calendar'
    })
    ;
}
