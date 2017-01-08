import { PlainStory } from '../../model/radon';
import { StorageService } from '../../services/storage';
import { EncryptionService } from '../../services/encryption';
import * as moment from 'moment';
import * as PubSub from 'pubsub-js';

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

      PubSub.unsubscribe('story');
      PubSub.subscribe('story', this.handleStoryAction);
    }
  }

  saveStory() {
    let encryptedStory = this.EncryptionService.encryptStory(this.story);
    this.StorageService.saveStory(encryptedStory);
    this.$state.go('app.storyRead', { storyDate: moment(this.date).format('YYYYMMDD') });
  }

  deleteStory() {
    if (confirm('Are you sure?')) {
      this.StorageService.deleteStory(this.date).then(() => {
        this.$state.go('app.calendar');
      });
    }
  }

  private handleStoryAction = (msg: string, action: string) => {
    switch (action) {
      case 'save':
        this.saveStory();
        break;
      case 'discard':
        this.$state.go('app.storyRead', { storyDate: moment(this.date).format('YYYYMMDD') });
        break;
    }
  }
}

export const storyEdit: angular.IComponentOptions = {
  template: require('./edit.html'),
  controller: StoryEditController
};
