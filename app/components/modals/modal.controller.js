import angular from 'angular';
/**
 * Controller to use with $uibModal. Can be extended by any needed functionality
 *
 * @class
 */
export default class PopupBaseController {
  /**
   * @ngInject
   */
  constructor($injector, $uibModalInstance, options) {
    this.modalInstance = $uibModalInstance;
    this.$q = $injector.get('$q');
    this.setOptions(options);
  }

  setOptions(options) {
    Object.assign(this, options);
  }

  close() {
    this.modalInstance.close();
  }

  submit() {
    this.onSubmit = this.onSubmit || angular.noop;
    this.$q.resolve(this.onSubmit())
      .then(() => {
        this.modalInstance.close();
      })
  }
}
