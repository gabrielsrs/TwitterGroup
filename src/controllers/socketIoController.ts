import { Request, Response } from 'express';

interface IBlockquote {
 tweets: object
}

class SocketIoRender {
 handleHome(request: Request, response: Response,
  {
   tweets
  }: IBlockquote) {
   
  return response.render('home', { tweets })
 }
}

export { SocketIoRender }