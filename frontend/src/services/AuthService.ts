import NetworkService from "@/services/NetworkService";
import UserStore from "@/stores/UserStore";
import LoaderStore from "@/stores/LoaderStore";

export default class AuthService {
  private networkService: NetworkService;
  private userStore: UserStore;
  private loaderStore: LoaderStore;

  constructor(networkService: NetworkService, userStore: UserStore, loaderStore: LoaderStore) {
    this.networkService = networkService;
    this.userStore = userStore;
    this.loaderStore = loaderStore;
  }

  async login(email: string, password: string) {
    this.loaderStore.setLoader(true);
    const {data} = await this.networkService.fetch('user/login', {email, password});
    const {token} = data;
    this.networkService.setToken(token);
    localStorage.setItem('token', token);
    this.loaderStore.setLoader(false);
  }

  async register(email: string, password: string) {
    this.loaderStore.setLoader(true);
    const {data} = await this.networkService.fetch('user/register', {email, password});
    const {token} = data;
    this.networkService.setToken(token);
    localStorage.setItem('token', token);
    this.loaderStore.setLoader(false);
  }

  async authentication() {
    this.loaderStore.setLoader(true);
    const {data} = await this.networkService.fetch('user/userInfo', null, 'GET');
    if (data) {
      this.userStore.setUser(data, true);
    } else {
      this.userStore.setUser({}, false);
      localStorage.removeItem('token');
    }
    this.loaderStore.setLoader(false);
  }


  async logout() {
    this.loaderStore.setLoader(true);
    await this.networkService.fetch('user/logout', null, 'GET');
    this.userStore.setUser({}, false);
    localStorage.removeItem('token');
    this.loaderStore.setLoader(false);
  }
}