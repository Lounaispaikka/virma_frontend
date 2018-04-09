import { observable } from 'mobx';

export default class Login {
  @observable isLoggedIn = false;
  @observable loggedUser = '';
  @observable updater_id = '';
  @observable isAdmin = false;

  setLogin(loggedIn, user, admin, updater_id) {
    this.isLoggedIn = loggedIn;
    this.loggedUser = user;
    this.isAdmin = admin;
    this.updater_id = updater_id;
  }
}
