import needle from 'needle';
import { Configuration } from './config/config';

interface ITweetsData {
 idNextToken: Array<any>,
}

class TweetsData {
 async hook({
  idNextToken,
 }: ITweetsData) {
  const config = new Configuration();
  const queryParameters: Record<string, any> = config.parameters()
  const queryCredentials = config.credentials()
  const tweetsUser: Array<any> = []; // when start the class what will go the data of array? if have data define with let and clean

  for(let userInfo of idNextToken) {
   const url = `https://api.twitter.com/2/users/${userInfo['id']}/tweets`;

   queryParameters['max_results'] = userInfo.count

   if(userInfo['next_token']) {
    queryParameters['pagination_token'] = `${userInfo['next_token']}`
   }

   const resp = await needle('get', url, queryParameters, queryCredentials)

   const objBuild: Record<string, any> = {}
   objBuild[userInfo['id']] = resp.body 
   tweetsUser.push(objBuild)
  }

  return tweetsUser
 }
}

export { TweetsData }