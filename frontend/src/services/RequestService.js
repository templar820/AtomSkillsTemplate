import MyError from '@/services/MyError';

export default class RequestService {
  constructor(networkService) {
    this.networkService = networkService;
  }

  checkResponse = res => !(res instanceof MyError);
  // TODO куча запросов
}
