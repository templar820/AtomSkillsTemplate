import NetworkService from "@/services/NetworkService";
import UserStore from "@/stores/UserStore";

export default class AuthService {
  private networkService: NetworkService;
  private userStore: UserStore;
  constructor(networkService: NetworkService, userStore: UserStore) {
    this.networkService = networkService;
    this.userStore = userStore;
  }

  async login(email: string, password: string) {
    const {data} = await this.networkService.fetch('user/login', {email, password});
    this.networkService.setToken(data.token);
  }

  async register(email: string, password: string) {
    const {data} = await this.networkService.fetch('user/register', {email, password});
    this.networkService.setToken(data.token);
  }

  async authentication() {
    const {data} = await this.networkService.fetch('users/getUserInfo');
    if (data) {
      this.userStore.setUser(data, true);
    } else {
      this.userStore.setUser({}, false);
      localStorage.removeItem('token');
    }
  }


  async logout() {
    await this.networkService.fetch('logout');
  }
}