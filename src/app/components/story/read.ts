import { PlainStory } from '../../model/radon';
import { StorageService } from '../../services/storage';
import { EncryptionService } from '../../services/encryption';
import * as moment from 'moment';

class StoryReadController {
  private moment: moment.MomentStatic = require('moment');
  private story: PlainStory;
  private date: Date;
  private noStoryAvailable: boolean;
  private $state: ng.ui.IStateService;

  /** @ngInject */
  constructor($state: ng.ui.IStateService, StorageService: StorageService, EncryptionService: EncryptionService, $scope: ng.IRootScopeService) {
    if (!EncryptionService.isReady()) {
      $state.go('app.home');
    } else {
      this.$state = $state;
      this.date = this.moment(($state.params as any).storyDate, 'YYYYMMDD').toDate();
      StorageService.fetchStory(this.date)
        .then(encryptedStory => {
          this.story = EncryptionService.decryptStory(encryptedStory);
          $scope.$apply();
        }, error => {
          this.noStoryAvailable = true;
          $scope.$apply();
        });
    }
  }

  moveStory(d: number) {
    let newDate = moment(this.date).add('day', d).format('YYYYMMDD');
    this.$state.go('app.storyRead', { storyDate: newDate });
  }
}

export const storyRead: angular.IComponentOptions = {
  template: require('./read.html'),
  controller: StoryReadController
};
