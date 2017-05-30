import templateUrl from './view-login.tpl.html';
import LoginCtrl from './view-login.controller';


/**
 * @ngdoc directive
 * @name cdpLogin.cdpLoginLayout
 *
 * @scope
 *
 * @description
 * Component to render login layout
 */
export default {
  templateUrl,
  controller: LoginCtrl,
  bindings: {
    login: '<',
    password: '<'
  },
  controllerAs: 'ctrl'
};
