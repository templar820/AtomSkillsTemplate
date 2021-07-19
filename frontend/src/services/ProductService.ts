import NetworkService from "@/services/NetworkService";
import ProductStore from "@/stores/ProductStore";
import LoaderStore from "@/stores/LoaderStore";

export default class ProductService {
  private networkService: NetworkService;
  private productStore: ProductStore;
  constructor(networkService: NetworkService, productStore: ProductStore, loaderStore: LoaderStore) {
    this.networkService = networkService;
    this.productStore = productStore;
  }

  async getProducts() {
    const offset = this.productStore.products?.length || 0;
    const limit = 48;
    const {data} = await this.networkService.fetch('products/part', {offset, limit});
    if (!data) return; //TODO это ошибка, сделать обработку ошибок
    this.productStore.addProducts(data.products);
    this.productStore.setCount(data.count);
  }
}
