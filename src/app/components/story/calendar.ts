import { EncryptionService } from '../../services/encryption';
import { StorageService } from '../../services/storage';

class CalendarController {
  private moment = require('moment');
  private EncryptionService: EncryptionService;
  private StorageService: StorageService;
  private $state: ng.ui.IStateService;

  private selectedDates: Date[];

  /** @ngInject */
  constructor(EncryptionService: EncryptionService, $state: ng.ui.IStateService, StorageService: StorageService) {
    this.EncryptionService = EncryptionService;
    this.StorageService = StorageService;
    this.$state = $state;

    // i should not be here if the encryptionservice isn't ready
    if (!EncryptionService.isReady()) {
      $state.go('app.home');
    }

    this.selectedDates = StorageService.dates;
  }

  public clickedDay = (date: Date) => {
    let storyDate = this.moment(date).format('YYYYMMDD');
    this.$state.go('app.storyRead', {
      storyDate: storyDate
    });
  }

  public setDayContent = (d1: Date) => {
    return undefined;
    /*let today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.getTime() === d1.getTime() ? '#' : undefined;*/
  }
}

export const calendar: angular.IComponentOptions = {
  template: require('./calendar.html'),
  controller: CalendarController
};
