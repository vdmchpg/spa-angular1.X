export default class TopPanelLayoutCtrl {
  /*@ngInject*/
  constructor(UserFct) {
    this.UserFct = UserFct;

  }

  $onInit() {
    this.user = this.UserFct.currentUser;
  }

  /*serializeState(state, initialState) {
    const serializedState = [];
    state.replace(initialState + '.', '').split('.').reduce((previousValue, currentValue) => {
      const state = `${previousValue}.${currentValue}`;
      serializedState.push({name: currentValue, state});
      return state;
    }, initialState);

    return serializedState;
  }*/

  logout () {
    this.UserFct.currentUser = null;
    sessionStorage.removeItem('CDP-logged-in');
  }
}
