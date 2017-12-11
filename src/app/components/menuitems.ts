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
    this.closeSidePanel();
  }

  editStory() {
    PubSub.publish('story', 'edit');
    this.closeSidePanel();
  }

  deleteStory() {
    PubSub.publish('story', 'delete');
    this.closeSidePanel();
  }

  discardStory() {
    PubSub.publish('story', 'discard');
    this.closeSidePanel();
  }

  closeSidePanel() {
    $('#navPanel').removeClass('visible');
  }

  go(to: string){
    this.$state.go(to);
    this.closeSidePanel();
  }
}

export const menuitems: angular.IComponentOptions = {
  template: require('./menuitems.html'),
  controller: MenuitemsController
};
