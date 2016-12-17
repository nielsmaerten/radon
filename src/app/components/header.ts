import { AuthService } from '../../app/services/auth';
declare var $: any;
class HeaderController {
  private AuthService: AuthService;

  /** @ngInject */
  constructor(AuthService: AuthService) {
    this.AuthService = AuthService;

    $('#navPanel').panel({
        delay: 500,
        hideOnClick: true,
        hideOnSwipe: true,
        resetScroll: true,
        resetForms: true,
        side: 'left'
      });
  }
}

export const header: angular.IComponentOptions = {
  template: require('./header.html'),
  controller: HeaderController
};
