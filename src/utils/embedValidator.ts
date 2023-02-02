import { tweetsIdBuild } from './tweetsIdBuild';
import { rTweets } from './rTweets';

export async function embedValidator(fullDataUser: Array<any>, tweetsId: Array<any>) {
 await rTweets(fullDataUser)
 tweetsIdBuild(fullDataUser, tweetsId)

 const tweetsToRequest = tweetsId.filter((a: Record<string, any>, b: number) => {
   if(b <= 9) {
     return a
   }
 })

 tweetsToRequest.forEach((tweets: Record<string, string>) => {
   fullDataUser.forEach((all: any, indexUser: number) => {
     const position = all.tweetsData['data'].findIndex((element: any) => element.id == tweets.id)
     if(position != -1) {
       fullDataUser[indexUser].tweetsData.data.splice(position, 1)
     }
   })
 })
 tweetsId.splice(0, 10)

 return tweetsToRequest
}