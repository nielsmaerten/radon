import { EncryptionService } from '../../services/encryption';
import { StorageService } from '../../services/storage';
import { AuthService } from '../../services/auth';

class CryptoUnlockController {
  public passphrase: string;
  public incorrectPassphrase: boolean;
  private StorageService: StorageService;
  private EncryptionService: EncryptionService;
  private $state: ng.ui.IStateService;
  private $scope: ng.IRootScopeService;

  /** @ngInject */
  constructor(StorageService: StorageService, EncryptionService: EncryptionService, $state: ng.ui.IStateService, AuthService: AuthService, $scope: ng.IRootScopeService) {
    this.EncryptionService = EncryptionService;
    this.StorageService = StorageService;
    this.$state = $state;
    this.$scope = $scope;
    if (!AuthService.isAuthenticated) {
      // the app either has not fully initialized, or I'm simply not yet authenticated.
      // either way, I should not be unlocking right now: redirect to the home route
      $state.go('app.home');
    } else {
      // i am authenticated, but has the salt been set yet?
      StorageService.onSaltSet(() => {
        if (!EncryptionService.hasSalt()) {
          // no salt has been set yet, I still need to set one up:
          $state.go('app.cryptoSetup');
        } else {
          // i have a salt, is the encryptionService unlocked?
          if (EncryptionService.isReady()) {
            // i have already unlocked the key, redirect to the calendar
            $state.go('app.calendar');
          }
        }
      });
    }
  }

  public unlock() {
    this.EncryptionService.loadEncryptionKey(this.passphrase)
      .then(() => {
        this.$state.go('app.calendar');
      }, () => {
        this.incorrectPassphrase = true;
        this.passphrase = '';
        this.$scope.$apply();
      });
  }
}

export const cryptoUnlock: angular.IComponentOptions = {
  template: require('./unlock.html'),
  controller: CryptoUnlockController
};
