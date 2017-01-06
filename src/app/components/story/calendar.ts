import { EncryptionService } from '../../services/encryption';

class CalendarController {
  private moment = require('moment');
  private EncryptionService: EncryptionService;
  private $state: ng.ui.IStateService;

  private selectedDate: Date;

  /** @ngInject */
  constructor(EncryptionService: EncryptionService, $state: ng.ui.IStateService) {
    this.EncryptionService = EncryptionService;
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
