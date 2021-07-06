import NetworkService from "@/services/NetworkService";
import ProductStore from "@/stores/ProductStore";
// import UserStore from "@/stores/UserStore";

export default class ProductService {
  private networkService: NetworkService;
  private productStore: ProductStore;
  constructor(networkService: NetworkService, productStore: ProductStore) {
    this.networkService = networkService;
    this.productStore = productStore;
  }

  async getProducts() {
    const {data} = await this.networkService.fetch('products', null, 'GET');
    if (!data) return; //TODO это ошибка, сделать обработку ошибок
    this.productStore.setProducts(data);
  }
}