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
      $state.go('app.home');
    }
  }

  public setPassphrase() {
    if (this.passphrase === this.passphraseConfirm) {
      this.StorageService.setSalt().then(() => {
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
