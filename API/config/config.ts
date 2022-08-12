import { ApiKey } from './apiKey'

class Configuration{
 parameters(){
    const params = {
    'tweet.fields': 'created_at',
    'expansions': 'author_id',
    'exclude': 'replies,retweets',
    }

    return params
 }

 credentials() {
   const apiKey = new ApiKey();
   const objects = {
       headers: {
           'user-agent': 'v2UserTweetsJS',
           'authorization': `Bearer ${apiKey.token()}`
       }
      }
   return objects
 }
};

export { Configuration }
