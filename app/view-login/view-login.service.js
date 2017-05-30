import angular from 'angular';

export default /*@ngInject*/$injector => { //eslint-disable-line max-statements
  const $resource = $injector.get('$resource');
  const loginService = $resource('app/login', null, {
    sendCredentials: {
      method: 'POST',
    },
  });

  return loginService;
};

