import { AuthService } from './services/auth';

class MainController {
  private AuthService: AuthService;

  /** @ngInject */
  constructor(AuthService: AuthService) {
    this.AuthService = AuthService;
  }
}
export const main: angular.IComponentOptions = {
  template: require('./main.html'),
  controller: MainController
};
