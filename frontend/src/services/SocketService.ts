import socketClient from 'socket.io-client';

class SocketService {
  private socket: any;

  readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = 'http://localhost:8080';
  }

  register(token: string) {
    console.log(1, this.endpoint);
    this.socket = socketClient(this.endpoint, {
      query: { token },
    });

    this.socket.on('connection', (value) => {
      // this.socket.on('product', productService.socketHandler);
      switch (value.type) {
        case 'delete': {

        }
      }
    });
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export default SocketService;
