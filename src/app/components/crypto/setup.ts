class CryptoSetupController {
  /** @ngInject */
  constructor() {
    //
  }

  public setPassphrase() {
    alert('');
  }
}

export const cryptoSetup: angular.IComponentOptions = {
  template: require('./setup.html'),
  controller: CryptoSetupController
};
