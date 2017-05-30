import angular from 'angular';
/*import router  from '../router';*/

import headerComponent from './header/header-layout.component';
import footerComponent from './footer/footer-layout.component';
import topPanelComponent from './top-panel/top-panel-layout.component';

/**
 * @ngdocs overview
 * @name cdpLayouts
 *
 * @description
 * Module for layout components like header or footer
 */
export default angular.module('cdpLayouts', [ // eslint-disable-line angular/file-name
  /*router*/
])

  .component('cdpHeader', headerComponent)
  .component('cdpFooter', footerComponent)
  .component('cdpTopPanel', topPanelComponent)
  .name;
