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
    this.productStore.addProducts(data.products);
    this.productStore.setCount(data.count);
  }

  async deleteProduct(id: number) {
    await this.networkService.fetch(`products/${id}`, undefined, 'DELETE');
    this.productStore.deleteProduct(id);
  }

  async createProduct(productName: string, substanceId: number) {
    if (Number.isNaN(substanceId)) throw Error('Неверный id');
    const {data} = await this.networkService.fetch('products', {name: productName, substanceId});
    this.productStore.unshiftProduct(data);
  }

  async updateProduct(id: number, productName: string, substanceId: number) {
    if (Number.isNaN(substanceId)) throw Error('Неверный id');
    const {data} = await this.networkService.fetch('products', {id, name: productName, substanceId}, 'PATCH');
    this.productStore.updateProduct(data);
  }

  async searchProduct(product: string) {
    const offset = 0;
    const limit = 48;
    const {data} = await this.networkService.fetch('products/search', {offset, limit, query: product}, );
    this.productStore.clearProducts();
    this.productStore.addProducts(data.products);
    this.productStore.setCount(data.length);
  }
}
