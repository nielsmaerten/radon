import { PlainStory } from '../../model/radon';
import { StorageService } from '../../services/storage';
import { EncryptionService } from '../../services/encryption';

class StoryReadController {
  private moment: moment.MomentStatic = require('moment');
  private story: PlainStory;
  private date: Date;
  private noStoryAvailable: boolean;

  /** @ngInject */
  constructor($state: ng.ui.IStateService, StorageService: StorageService, EncryptionService: EncryptionService) {
    if (!EncryptionService.isReady()) {
      $state.go('app.home');
    } else {
      this.date = this.moment(($state.params as any).storyDate, 'YYYYMMDD').toDate();
      StorageService.fetchStory(this.date)
        .then(encryptedStory => {
          this.story = EncryptionService.decryptStory(encryptedStory);
        }, error => {
          alert('WHAT THE FUCK IS THIS SHIT. WHY CAN\'T I SET A PROPERTY FROM HERE?!');
          this.noStoryAvailable = true;
        });
    }
  }
}

export const storyRead: angular.IComponentOptions = {
  template: require('./read.html'),
  controller: StoryReadController
};
