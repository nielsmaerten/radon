import { EncryptionService } from '../../services/encryption';

class CalendarController {
  private EncryptionService: EncryptionService;
  private $state: ng.ui.IStateService;

  /** @ngInject */
  constructor(EncryptionService: EncryptionService, $state: ng.ui.IStateService) {
    this.EncryptionService = EncryptionService;
    this.$state = $state;
    if (!EncryptionService.isReady()) {
      $state.go('app.home');
    } else {
      // i'm allowed to be here
    }
  }
}

export const calendar: angular.IComponentOptions = {
  template: require('./calendar.html'),
  controller: CalendarController
};
