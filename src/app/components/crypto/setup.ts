import { EncryptionService } from '../../services/encryption';
import { StorageService } from '../../services/storage';
import { AuthService } from '../../services/auth';

class CryptoSetupController {
  public passphrase: string;
  public passphraseConfirm: string;
  private StorageService: StorageService;
  private EncryptionService: EncryptionService;
  private $state: ng.ui.IStateService;

  /** @ngInject */
  constructor(StorageService: StorageService, EncryptionService: EncryptionService, $state: ng.ui.IStateService, AuthService: AuthService) {
    this.EncryptionService = EncryptionService;
    this.StorageService = StorageService;
    this.$state = $state;
    if (!AuthService.isAuthenticated) {
      // the app either has not fully initialized, or I'm simply not yet authenticated.
      // either way, I should not be creating a key right now: redirect to the home route
      $state.go('app.home');
    } else {
      // i am authenticated, but has the salt been set yet?
      StorageService.onSaltSet(() => {
        if (EncryptionService.hasSalt()) {
          // a salt has been set, and i cannot set it again: redirect to home
          // from home, I will either be redirected to crypto.Unlock or to the calendar
          $state.go('app.home');
        }
      });
    }
  }

  public setPassphrase() {
    if (this.passphrase === this.passphraseConfirm) {
      this.StorageService.setPassphrase(this.passphrase).then(() => {
        this.EncryptionService.loadEncryptionKey(this.passphrase);
        this.$state.go('app.calendar');
      });
    }
  }
}

export const cryptoSetup: angular.IComponentOptions = {
  template: require('./setup.html'),
  controller: CryptoSetupController
};
