import Router, {Express} from "express";
import {asyncMiddleware} from "../middleware/asyncMiddleware";
import {ServerError} from "../middleware/errorHandler";

type requestType = "get" | "post" | "delete" | "patch";

export default class BaseRouter {
  router: Express;
  
  constructor() {
    this.router = new Router();
  }
  
  checkRole(role: string, access?: string[]){
    if (!(access?.length) ||  access.includes(role)) {
      return true
    } else {
      throw new ServerError(403, "Нет доступа к операции")
    }
  }
  
  createHandleWithBody(request: requestType, path: string, handler: (body: any) => any, access?: string[]){
    this.router[request](path, asyncMiddleware(async (req, res) =>{
      if(this.checkRole(req.user.role, access)) res.sendFormat(await handler(req.body))
    }))
  }
  
  createHandleWithParams(request: requestType, path: string, handler: (params: any) => any, params: string | number,  access?: string[]){
    this.router[request](path, asyncMiddleware(async (req, res) =>{
      if(this.checkRole(req.user.role, access)) res.sendFormat(await handler(req.params[params]))
    }))
  }
  
  createHandleWithQueryParams(request: requestType, path: string, handler: (params: any) => any, params: string[] | number[], access?: string[]){
    this.router[request](path, asyncMiddleware(async (req, res) =>{
      if(this.checkRole(req.user.role, access)) res.sendFormat(await handler(params.map(el => req.query[el])));
    }))
  }
}
