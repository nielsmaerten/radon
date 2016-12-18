import { AuthService } from '../services/auth';
class EncryptionkeyComponentController {
  private AuthService: AuthService;

  /** @ngInject */
  constructor(AuthService: AuthService) {
    this.AuthService = AuthService;
  }
}
export const encryptionkeyForm: angular.IComponentOptions = {
  template: require('./encryptionkey.html'),
  controller: EncryptionkeyComponentController
};
