import needle from 'needle';
import { Configuration } from './config/config';

interface IUsersData {
 usernames: Array<any>
}

class UsersData {
 async hook ({
  usernames
 }: IUsersData) {
  const config = new Configuration();
  const queryCredentials = config.credentials()
  const userData: Array<any> = []

  for(let username of usernames) {
   const url = `https://api.twitter.com/2/users/by/username/${username}`;
   const resp = await needle('get', url, queryCredentials);
   userData.push(resp.body.data)
  }

  return userData
 }
}

export { UsersData }