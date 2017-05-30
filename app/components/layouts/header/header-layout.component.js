import controller  from './header-layout.controller';
import templateUrl from './header-layout.tpl.html';

import './header.less';

/**
 * @ngdoc directive
 * @name cdpLayouts.pkmHeader
 * @scope
 *
 * @description Header layout component
 */
export default {
  templateUrl,
  controller,
  controllerAs: 'header'
};
