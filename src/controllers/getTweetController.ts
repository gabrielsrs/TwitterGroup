import { Request, Response } from 'express';

import { GetTweetService } from '../services/getTweetService';

class GetTweetController {
 async handle(request: Request, response: Response){
  // const usernames = request.body
  const usernames  = ['Casimiro', 'GueibrisuelReis', 'elonmusk']

  const getTweetService = new GetTweetService()

  const tweets = await getTweetService.getTweets({
   usernames
  })

  return response.render('home', { tweets })
  // return response.json(tweets)
 }
}

export { GetTweetController }