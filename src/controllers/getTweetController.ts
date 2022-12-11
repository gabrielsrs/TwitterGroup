import { Request, Response } from 'express';

import { GetTweetService } from '../services/getTweetService';

interface IGroups {
 groups: object
}

class GetTweetController {
 async handle(request: Request, response: Response) {
  const groups = request.cookies
  
  const usernames: string[] = []

  if(groups.groups) {
   Object.values(JSON.parse(groups.groups)).forEach((singleGroup: any) => {
    singleGroup.forEach((user: string) => {
     usernames.push(user)
    })
   }); 
  }
  

  // const usernames  = ['Casimiro', 'GueibrisuelReis', 'elonmusk']
  // const usernames = request.body.usernames
  
  const getTweetService = new GetTweetService()

  const tweets = await getTweetService.getTweets({
   usernames
  })

  return response.render('home', { tweets })
  // return response.json(tweets)
 }
}

export { GetTweetController }