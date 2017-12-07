import { EncryptionService } from '../../services/encryption';
import { StorageService } from '../../services/storage';

class StoryListController {
  private moment = require('moment');
  private EncryptionService: EncryptionService;
  private StorageService: StorageService;
  private $state: ng.ui.IStateService;

  /** @ngInject */
  constructor(EncryptionService: EncryptionService, $state: ng.ui.IStateService, StorageService: StorageService) {
    this.EncryptionService = EncryptionService;
    this.StorageService = StorageService;
    this.$state = $state;

    // i should not be here if the encryptionservice isn't ready
    if (!EncryptionService.isReady()) {
      $state.go('app.home');
    }

  }
}

export const storyList: angular.IComponentOptions = {
  template: require('./list.html'),
  controller: StoryListController
};
