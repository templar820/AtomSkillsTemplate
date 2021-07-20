import MyError from '@/services/MyError';

export default class NetworkService {
  token: string | null = null;
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = `${endpoint}api/`;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  //TODO мы присылаем сообщение ошибки в json, переписать
  async checkResponse(res: Response) {
    if (res.status === 500) {
      throw new MyError({ detail: 'Внутренняя ошибка сервера' });
    } else if (res.status === 200) {
      const response = await res.json();
      if (response.isError) {
        throw new MyError({status: response.statusCode, detail: response.message})
      }
      return response;
    }
    return res;
  }

  fetch = (alias: string, parameters?: object | null, type = 'POST') => {
    const options : {method: string, headers: any, body: null | string} = {
      method: type,
      headers: this.buildHeaders(),
      body: null,
    };

    if (parameters) options.body = JSON.stringify(parameters);

    return fetch(`${this.endpoint}${alias}`, options)
      .then(response => this.checkResponse(response));
  }

  buildHeaders = () => ({
    'Content-Type': 'application/json',
    ...(this.token ? { token: `${this.token}` } : {})
  })
};

