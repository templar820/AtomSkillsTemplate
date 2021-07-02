import React from 'react';
import Router from '@/Router';
import NetworkService from '@/services/NetworkService';
import { StoresNames } from '@/services/common/constDictionary';
import { Provider } from 'mobx-react';
import LoaderStore from '@/stores/LoaderStore';
import ErrorWindow from '@/components/System/ErrorWindow';
import Loader from '@/components/System/Loader';
import UserStore from "./stores/UserStore";
import theme from './styles/muiTheme';
import { MuiThemeProvider } from '@material-ui/core'
import AuthService from "@/services/AuthService";
import ProductService from "@/services/ProductService";

class App extends React.Component {
  loaderStore: LoaderStore;
  userStore: UserStore;
  networkService: NetworkService;
  authService: AuthService;
  productService: ProductService;
  stores: {[key: string]: any};
  services: {[key: string]: any};

  constructor(props: {}) {
    super(props);
    // const endpoint = process.env.ENDPOINT;
    const endpoint = 'http://localhost:8080/';
    this.loaderStore = new LoaderStore();
    this.userStore = new UserStore();
    this.networkService = new NetworkService(endpoint, this.loaderStore);
    this.networkService.setToken(localStorage.getItem('token') || null);
    // this.requestService = new RequestService(this.networkService);
    this.authService = new AuthService(this.networkService, this.userStore);
    this.productService = new ProductService(this.networkService, null);

    this.stores = {
      [StoresNames.LoaderStore]: this.loaderStore,
      [StoresNames.UserStore]: this.userStore,
      [StoresNames.URL]: endpoint,
    };

    this.services = {
      networkService: this.networkService,
      // requestService: this.requestService,
      authService: this.authService,
      productService: this.productService,
    };
  }

  componentDidMount() {
    this.authService.authentication();
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider {...this.stores} services={this.services}>
          <ErrorWindow>
            <Loader />
            <Router />
          </ErrorWindow>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
