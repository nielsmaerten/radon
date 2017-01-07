import { PlainStory } from '../../model/radon';
import { StorageService } from '../../services/storage';
import { EncryptionService } from '../../services/encryption';
import * as moment from 'moment';

class StoryEditController {
  private moment: moment.MomentStatic = require('moment');
  private story: PlainStory;
  private date: Date;
  private $state: ng.ui.IStateService;
  private EncryptionService: EncryptionService;
  private StorageService: StorageService;

  /** @ngInject */
  constructor($state: ng.ui.IStateService, StorageService: StorageService, EncryptionService: EncryptionService, $scope: ng.IRootScopeService) {
    if (!EncryptionService.isReady()) {
      $state.go('app.home');
    } else {
      this.$state = $state;
      this.StorageService = StorageService;
      this.EncryptionService = EncryptionService;
      this.date = this.moment(($state.params as any).storyDate, 'YYYYMMDD').toDate();

      StorageService.fetchStory(this.date)
        .then(encryptedStory => {
          this.story = EncryptionService.decryptStory(encryptedStory);
          $scope.$apply();
        }, error => {
          this.story = new PlainStory(this.date, 'Write here...');
          $scope.$apply();
        });
    }
  }

  saveStory() {
    let encryptedStory = this.EncryptionService.encryptStory(this.story);
    this.StorageService.saveStory(encryptedStory);
    this.$state.go('app.storyRead', { storyDate: moment(this.date).format('YYYYMMDD') });
  }
}

export const storyEdit: angular.IComponentOptions = {
  template: require('./edit.html'),
  controller: StoryEditController
};
