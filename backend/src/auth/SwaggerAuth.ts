import express from 'express';


async function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {
  const token:any =  request.headers['token'];
  console.log(token);
  if (token) {
    return Promise.resolve(true);
  }else {
    return Promise.reject( new Error('jwt token malformed'));
  }
};

export {expressAuthentication}

