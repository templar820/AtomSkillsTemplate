import {
  action, computed, makeObservable, observable, toJS
} from 'mobx';
import UserModel from "../model/UserModel";
let user = null;
try {
  user = JSON.parse(localStorage.getItem("user"));
} catch (e) {}

class UserStore {
  currentUser = user ? new UserModel(user): null;
  users = []

  constructor() {
    makeObservable(this, {
      currentUser: observable,
      users: observable,
      setUser: action,
    });
  }

  setUser(user) {
    if (!user) {
      this.currentUser = null;
    } else {
      this.currentUser = new UserModel(user);
    }
    localStorage.setItem("user", JSON.stringify(user));
  }

  setUsers(users) {
    this.users = users.map(el => new UserModel(el));
  }
}

export default UserStore;