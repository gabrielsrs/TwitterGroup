import { TweetsData } from '../../API/tweetsData';
import { idNextToken } from "./idNextToken";

export async function rTweets(fullDataUser: Array<any>) {
 const tweetsData = new TweetsData();

 return (await tweetsData.hook({
   idNextToken: idNextToken(fullDataUser)
  })).forEach((a: Record<string, any>) => {
   let listPosition = fullDataUser.findIndex(obj => obj.id == Object.keys(a)[0])

   if(!fullDataUser[listPosition].tweetsData){// maybe will be error property not found 
     fullDataUser.push.call(fullDataUser[listPosition].tweetsData = a[Object.keys(a)[0]])
   } else {
     fullDataUser[listPosition].tweetsData.meta['next_token'] = a[Object.keys(a)[0]].meta['next_token']
     a[Object.keys(a)[0]].data.forEach((x: Record<string, any>) => {
       fullDataUser[listPosition].tweetsData.data.push(x)
     })
   }
 })
}