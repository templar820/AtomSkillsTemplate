import { Express } from 'express';
import { Socket } from 'socket.io';
import socketioJwt from 'socketio-jwt';
import CONSTANT from "../config/CONSTANT";
import SessionStore from "../config/SessionStore";

const server = require('http');
const socket = require('socket.io');

export default class IoModel {
  http: any;

  io: Socket;

  currentId : string;
  
  
  constructor(app: Express) {
    this.http = server.Server(app);
    this.io = socket(this.http, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
      }
    });

    this.io.use(socketioJwt.authorize({
      secret: CONSTANT.secretWord,
      handshake: true
    }));
    this.io.on('connection', (socket: any) => {
      console.log();
      SessionStore.set(socket.handshake.query.token, {sid: socket.conn.id})
      socket.emit('connection', 'Здарова отец');
    });

    
    app.use((req, res, next) => {
      res.io = this.io;
      next();
    });
  }
}
