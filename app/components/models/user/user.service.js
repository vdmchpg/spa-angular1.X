import angular from 'angular';

export default /*@ngInject*/$injector => { //eslint-disable-line max-statements
  const UserService = {
    redirectTo: {state:'app.courses'},
    user: sessionStorage.getItem('CDP-logged-in') || null,

    set currentUser(user) {
      this.user = user;
    },

    get currentUser() {
      return this.user;
    },

    setRedirectState (state, params) {
      this.redirectTo = { state, params }
    }
  };

  return UserService;
};

