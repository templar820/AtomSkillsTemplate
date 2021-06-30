import MyError from '@/services/MyError';
import LoaderStore from "@/stores/LoaderStore";

export default class NetworkService {
  token: string | null = null;
  endpoint: string;
  loaderStore: LoaderStore;
  constructor(endpoint: string, loaderStore: LoaderStore) {
    this.endpoint = `${endpoint}api/`;
    this.loaderStore = loaderStore;
  }

  setToken(token: string | null) {
    this.token = token;
    console.log(this.token);
  }

  //TODO мы присылаем сообщение ошибки в json, переписать
  async checkResponse(res) {
    let response;
    this.loaderStore.setLoader(null);

    if (res.status === 500) {
      response = new MyError({ detail: 'Внутренняя ошибка сервера' });
    } else if (res instanceof Error) {
      response = new MyError({ detail: res.message });
    } else {
      response = await res.json();
      return response;
      //response = (response.success) ? response.result : new MyError(response.error);
    }

    return response;
  }

  /**
   * Общий запрос ко всем методам StaticService
   * @param {String} alias - метод в сваггере
   * @param {Object} parameters
   * @param {Object} extra - экстра параметры file, multipart
   */
  fetch = (alias: string, parameters?: object, type = 'POST') => {
    // this.loaderStore.setIsBlocked(true);
    this.options = {
      method: type,
      headers: this.buildHeaders(),
    };
    // console.log(this.options)

    if (parameters) this.options.body = JSON.stringify(parameters);
    this.loaderStore.startLoader();
    return fetch(`${this.endpoint}${alias}`, this.options)
      .then(response => this.checkResponse(response))
      .catch(err => this.checkResponse(err));
  }

  buildHeaders = () => ({
    'Content-Type': 'application/json',
    ...(this.token ? { token: `${this.token}` } : {})
  })
}
