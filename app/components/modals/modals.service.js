import defaultController from './modal.controller';
import modalTemplate from './modal.tpl.html';

/**
 * @ngdoc service
 * @name cdpModals.cdpModalsFct
 *
 * @description Service to open modals
 */
export default /*@ngInject*/$injector => ({
  modal     : $injector.get('$uibModal'),
  $rootScope: $injector.get('$rootScope'),

  open(options = {}) {
    let {
      submitTitle = 'Ok',
      onSubmit,
      templateUrl,
      message = 'Your need to confirm action',
      title = 'Confirm action',
      controller = defaultController,
      controllerAs = 'ctrl',
      scope,
      backdrop = 'static',
      size = 'md'
    } = options;

    const resolveOptions = {
      title,
      onSubmit,
      submitTitle,
      message,
      templateUrl
    };


    return this.modal.open({
      templateUrl: modalTemplate,
      controller,
      controllerAs,
      scope: this.createScope(scope, { controllerAs }),
      size,
      backdrop,

      resolve: {
        options() {
          return resolveOptions;
        }
      }
    });
  },

  createScope(scope = this.$rootScope, bindings) {
    const childScope = scope.$new(false);
    childScope.bindings = bindings;
    return childScope;
  }
});
