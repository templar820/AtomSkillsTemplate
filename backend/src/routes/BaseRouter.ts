import Router, {Express} from "express";
import {asyncMiddleware} from "../middleware/asyncMiddleware";

type requestType = "get" | "post" | "delete" | "patch";

export default class BaseRouter {
  router: Express;
  
  constructor() {
    this.router = new Router();
  }
  
  createHandleWithBody(request: requestType, path: string, handler: (body: any) => any){
    this.router[request](path, asyncMiddleware(async (req, res) =>{
      res.sendFormat(await handler(req.body))
    }))
  }
  
  createHandleWithQueryParams(request: requestType, path: string, handler: (params: any) => any, params: string | number){
    this.router[request](path, asyncMiddleware(async (req, res) =>{
      res.sendFormat(await handler(req.params[params]))
    }))
  }
}
