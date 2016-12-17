import { AuthService } from '../services/auth';
class BannerController {
  private AuthService: AuthService;

  /** @ngInject */
  constructor(AuthService: AuthService) {
    this.AuthService = AuthService;
  }
}
export const banner: angular.IComponentOptions = {
  template: require('./banner.html'),
  controller: BannerController
};
