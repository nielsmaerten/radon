import { PlainStory } from '../../model/radon';
import { StorageService } from '../../services/storage';
import { EncryptionService } from '../../services/encryption';
import * as moment from 'moment';
import * as PubSub from 'pubsub-js';

class StoryReadController {
  private moment: moment.MomentStatic = require('moment');
  private story: PlainStory;
  private date: Date;
  private noStoryAvailable: boolean;
  private $state: ng.ui.IStateService;
  private StorageService: StorageService;

  /** @ngInject */
  constructor($state: ng.ui.IStateService, StorageService: StorageService, EncryptionService: EncryptionService, $scope: ng.IRootScopeService) {
    if (!EncryptionService.isReady()) {
      $state.go('app.home');
    } else {
      this.$state = $state;
      this.StorageService = StorageService;
      this.date = this.moment(($state.params as any).storyDate, 'YYYYMMDD').toDate();
      StorageService.fetchStory(this.date)
        .then(encryptedStory => {
          this.story = EncryptionService.decryptStory(encryptedStory);
          $scope.$apply();
        }, error => {
          this.noStoryAvailable = true;
          $scope.$apply();
        });

      PubSub.unsubscribe('story');
      PubSub.subscribe('story', this.handleStoryAction);
    }
  }

  moveStory(d: number) {
    let newDate = moment(this.date).add(d, 'day').format('YYYYMMDD');
    this.$state.go('app.storyRead', { storyDate: newDate });
  }

  editStory() {
    this.$state.go('app.storyEdit', { storyDate: moment(this.date).format('YYYYMMDD') });
  }

  deleteStory() {
    if (confirm('Are you sure?')) {
      this.StorageService.deleteStory(this.date);
      this.$state.go('app.calendar');
    }
  }

  private handleStoryAction = (msg: string, action: string) => {
    switch (action) {
      case 'edit':
        this.editStory();
        break;
      case 'delete':
        this.deleteStory();
        break;
    }
  }
}

export const storyRead: angular.IComponentOptions = {
  template: require('./read.html'),
  controller: StoryReadController
};
