
/** @ngInject */
export const rootController = ($scope: any, $state: ng.ui.IStateService) => {
  $scope.$state = $state;
};
