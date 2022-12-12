import needle from 'needle';
import { Configuration } from './config/config';

interface IUsersData {
 usernames: Array<any>
 fields?: string
}

class UsersData {
 async hook ({
  usernames,
  fields
 }: IUsersData) {
  const config = new Configuration();
  const queryCredentials = config.credentials()
  const userData: Array<any> = []

  fields? fields: fields = ""

  for(let username of usernames) {
   const url = `https://api.twitter.com/2/users/by/username/${username}?user.fields=${fields}`;
   const resp = await needle('get', url, queryCredentials);
   userData.push(resp.body.data)
  }

  return userData
 }
}

export { UsersData }