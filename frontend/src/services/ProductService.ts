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

  async createProduct(productName: string, substanceName: string, substanceCode: string) {
    // const {data} = await this.networkService.fetch('products', {name: productName, substanceName, substanceCode});
    this.productStore.unshiftProduct({
      id: productName,
      name: productName,
      substance: {
        name: substanceName,
        id: substanceName,
        code: substanceCode,
      }
    });
  }

  async updateProduct(id: number, productName: string, substanceName: string, substanceCode: string) {
    // const {data} = await this.networkService.fetch('products', {id, name: productName, substanceName, substanceCode}, 'PATCH');
    this.productStore.updateProduct({
      id: id,
      name: productName,
      substance: {
        name: substanceName,
        id: substanceName,
        code: substanceCode,
      }
    });
  }
}
