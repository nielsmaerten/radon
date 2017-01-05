import { AuthService } from '../services/auth';
import { EncryptionService } from '../services/encryption';
import { StorageService } from '../services/storage';

class BannerController {
  private AuthService: AuthService;

  /** @ngInject */
  constructor(AuthService: AuthService, EncryptionService: EncryptionService, StorageService: StorageService, $state: ng.ui.IStateService) {
    this.AuthService = AuthService;
    this.AuthService.authPromise.then(() => {
      StorageService.onSaltSet(() => {
        if (!EncryptionService.hasSalt()) {
          $state.go('app.cryptoSetup');
        } else if (EncryptionService.isReady()) {
          $state.go('app.calendar');
        } else {
          $state.go('app.cryptoUnlock');
        }
      });
    });
  }
}
export const banner: angular.IComponentOptions = {
  template: require('./banner.html'),
  controller: BannerController
};
