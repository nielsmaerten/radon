import { AuthService } from '../services/auth';

class MenuitemsController {
  private AuthService: AuthService;

  /** @ngInject */
  constructor(AuthService: AuthService) {
    this.AuthService = AuthService;
  }
}

export const menuitems: angular.IComponentOptions = {
  template: require('./menuitems.html'),
  controller: MenuitemsController
};
