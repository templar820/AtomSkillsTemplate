import MyError from '@/services/MyError';

export default class RequestService {
  constructor(networkService) {
    this.networkService = networkService;
  }

  checkResponse = res => !(res instanceof MyError);
  // TODO куча запросов

  async login(email, password) {

    const {token} = await this.networkService.fetch('user/login', {email, password});
    this.networkService.setToken(token)
    const a = await this.networkService.fetch('posts',null,"GET")
    console.log(a);
  }

  async register(email, password) {

    const user = await this.networkService.fetch('user/register', {email, password});
  }

  async logout() {

    await this.networkService.fetch('logout');
  }
}
