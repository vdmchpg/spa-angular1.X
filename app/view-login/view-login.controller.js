/**
 * @ngdoc controller
 *
 * @class
 * @description
 * Controller for Login component
 */

export default class LoginCtrl {
  /*@ngInject*/
  constructor(loginFct, $state, UserFct) {
    this.loginFct = loginFct;
    this.state = $state;
    this.userFct = UserFct;
  }

  $onInit() {
    this.authErr = false;
    this.checkSession();
  }

  onSubmit() {
    this.loginFct.sendCredentials({login: this.login, password: this.password})
      .$promise
      .then((data) => {
        data.status === 'success' ? this.onAuthSuccess() : this.onAuthFail();
      });
  }

  onAuthSuccess () {
    this.makeSession();
    this.userFct.currentUser = this.login;
    this.state.go(this.userFct.redirectTo.state, this.userFct.redirectTo.params);
  }

  makeSession () {
    sessionStorage.setItem("CDP-logged-in", this.login);
  }

  checkSession () {
    if(sessionStorage.getItem("CDP-logged-in")) {
      this.state.go(this.userFct.redirectTo);
    }
    return false;
  }

  onAuthFail () {
    this.authErr = true;
    this.password = "";
  }
}
