import React from 'react';
import Router from '@/Router';
import NetworkService from '@/services/NetworkService';
import { StoresNames } from '@/stores/StoresNames';
import { Provider } from 'mobx-react';
import LoaderStore from '@/stores/LoaderStore';
import ErrorWindow from '@/components/System/ErrorWindow';
import Loader from '@/components/System/Loader';
import UserStore from "./stores/UserStore";
import ProductStore from "./stores/ProductStore";
import theme from './styles/muiTheme';
import { MuiThemeProvider } from '@material-ui/core'
import AuthService from "@/services/AuthService";
import ProductService from "@/services/ProductService";

class App extends React.Component {
  stores: {[key: string]: any};
  services: {[key: string]: any};

  constructor(props: {}) {
    super(props);
    const endpoint = process.env.ENDPOINT;
    const loaderStore = new LoaderStore();
    const userStore = new UserStore();
    const productStore = new ProductStore();
    const networkService = new NetworkService(endpoint);
    networkService.setToken(localStorage.getItem('token') || null);
    // this.requestService = new RequestService(this.networkService);
    const authService = new AuthService(networkService, userStore, loaderStore);
    const productService = new ProductService(networkService, productStore, loaderStore);

    this.stores = {
      [StoresNames.LoaderStore]: loaderStore,
      [StoresNames.UserStore]: userStore,
      [StoresNames.ProductStore]: productStore,
      [StoresNames.URL]: endpoint,
    };

    this.services = {
      networkService: networkService,
      // requestService: this.requestService,
      authService: authService,
      productService: productService,
    };
  }

  componentDidMount() {
    this.services.authService.authentication();
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider {...this.stores} services={this.services}>
          <ErrorWindow/>
          <Loader>
            <Router />
          </Loader>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
