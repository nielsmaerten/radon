import { AuthService } from '../services/auth';
import * as PubSub from 'pubsub-js';

class MenuitemsController {
  public isEditingStory: boolean;
  public isReadingStory: boolean;
  private AuthService: AuthService;
  private $state: ng.ui.IStateService;

  /** @ngInject */
  constructor(AuthService: AuthService, $state: ng.ui.IStateService) {
    this.$state = $state;
    this.AuthService = AuthService;
  }

  saveStory() {
    PubSub.publish('story', 'save');
  }

  editStory() {
    PubSub.publish('story', 'edit');
  }

  deleteStory() {
    PubSub.publish('story', 'delete');
  }

  discardStory() {
    PubSub.publish('story', 'discard');
  }
}

export const menuitems: angular.IComponentOptions = {
  template: require('./menuitems.html'),
  controller: MenuitemsController
};
