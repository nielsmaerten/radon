import { EncryptionService } from '../../services/encryption';
import { StorageService } from '../../services/storage';
declare var emojione: any;

class StoryListController {
  private moment = require('moment');
  private EncryptionService: EncryptionService;
  private StorageService: StorageService;
  private $state: ng.ui.IStateService;
  private $scope: ng.IScope;
  private stories: any[];
  private hideExpandAll: boolean;

  /** @ngInject */
  constructor(EncryptionService: EncryptionService, $state: ng.ui.IStateService, StorageService: StorageService, $scope: ng.IScope) {
    this.EncryptionService = EncryptionService;
    this.StorageService = StorageService;
    this.$state = $state;
    this.$scope = $scope;
    this.stories = [];
    this.hideExpandAll = false;

    // i should not be here if the encryptionservice isn't ready
    if (!EncryptionService.isReady()) {
      $state.go('app.home');
    } else {
      this.StorageService.dates.forEach(date => {
        this.stories.push({
          date: date
        })
      });
      this.stories = this.stories.reverse();
    }
  }

  public loadStory(story){
    story.show = !story.show;
    if (!story.loaded){
      this.StorageService.fetchStory(story.date).then(e => {
        story.Contents = this.EncryptionService.decryptStory(e).Contents;
        story.Contents = emojione.toImage(story.Contents);
        story.loaded = true;
        this.$scope.$apply();
      })
    }
  }

  public expandAll(){
    this.hideExpandAll = true;
    this.stories.forEach(story => {
      this.loadStory(story);
      story.show = true;
    })
  }
}

export const storyList: angular.IComponentOptions = {
  template: require('./list.html'),
  controller: StoryListController
};
