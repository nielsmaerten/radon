import { EncryptionService } from '../../services/encryption';
import { StorageService } from '../../services/storage';

class CalendarController {
  private moment = require('moment');
  private EncryptionService: EncryptionService;
  private StorageService: StorageService;
  private $state: ng.ui.IStateService;

  private selectedDate: Date;

  /** @ngInject */
  constructor(EncryptionService: EncryptionService, $state: ng.ui.IStateService, StorageService: StorageService) {
    this.EncryptionService = EncryptionService;
    this.StorageService = StorageService;
    this.$state = $state;

    // i should not be here if the encryptionservice isn't ready
    if (!EncryptionService.isReady()) {
      $state.go('app.home');
    }

    // set currentdate to midnight, so today gets selected in the calendar
    this.selectedDate = new Date();
    this.selectedDate.setHours(0, 0, 0, 0);
  }

  public clickedDay = (date: Date) => {
    let storyDate = this.moment(date).format('YYYYMMDD');
    this.$state.go('app.storyRead', {
      storyDate: storyDate
    });
  }
}

export const calendar: angular.IComponentOptions = {
  template: require('./calendar.html'),
  controller: CalendarController
};
