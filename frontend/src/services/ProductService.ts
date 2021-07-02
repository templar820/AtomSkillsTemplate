import NetworkService from "@/services/NetworkService";
// import UserStore from "@/stores/UserStore";

export default class ProductService {
  private networkService: NetworkService;
  private productStore: any;
  constructor(networkService: NetworkService, productStore: any) {
    this.networkService = networkService;
    this.productStore = productStore;
  }

  async getProducts() {
    const {data} = await this.networkService.fetch('companies', null, 'GET');
    if (!data) return; //TODO это ошибка, сделать обработку ошибок
    console.log(data);
  }
}