import MyError from '@/services/MyError';

export default class RequestService {
  constructor(networkService) {
    this.networkService = networkService;
  }

  checkResponse = res => !(res instanceof MyError);
  // TODO куча запросов

  async login(email, password) {

    const user = await this.networkService.fetch('login', {email, password});
    // console.log(a)
  }

  async register(email, password) {

    const user = await this.networkService.fetch('register', {email, password});
  }

  async logout() {

    await this.networkService.fetch('logout');
  }
}
