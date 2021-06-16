import React from 'react';
import Router from '@/Router';
import NetworkService from '@/services/NetworkService';
import RequestService from '@/services/RequestService';
import { StoresNames } from '@/services/common/constDictionary';
import { Provider } from 'mobx-react';
import LoaderStore from '@/stores/LoaderStore';
import ErrorWindow from '@/components/System/ErrorWindow';
import Loader from '@/components/System/Loader';
import UserStore from "./stores/UserStore";
import colors from './styles/colors.modules.scss';
console.log(colors);

class App extends React.Component {
  constructor(props) {
    super(props);
    // const endpoint = process.env.ENDPOINT;
    const endpoint = 'http://localhost:8080/';
    this.loaderStore = new LoaderStore();
    this.userStore = new UserStore();
    this.networkService = new NetworkService({ endpoint, loaderStore: this.loaderStore });
    this.requestService = new RequestService(this.networkService);

    this.networkService.setToken(localStorage.token || 'token');

    this.stores = {
      [StoresNames.LoaderStore]: this.loaderStore,
      [StoresNames.UserStore]: this.userStore,
      [StoresNames.URL]: endpoint,
    };

    this.services = {
      networkService: this.networkService,
      requestService: this.requestService,
    };
  }

  render() {
    return (
      <Provider {...this.stores} services={this.services}>
        <ErrorWindow>
          <Loader />
          <Router />
        </ErrorWindow>
      </Provider>
    );
  }
}

export default App;
