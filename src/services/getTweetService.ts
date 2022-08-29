import { UsersData } from '../../API/usersData';
import { TweetsData } from '../../API/tweetsData';
import { BuildEmbedService } from './buildEmbedService'

interface INames {
  usernames: Array<any>
}

class GetTweetService{
  fullDataUser: Array<any> = [];
  tweetsId: Array<any> = [];

 async getTweets({
  usernames
 }: INames) {
    const usersData = new UsersData();
    const tweetsData = new TweetsData();
    const buildEmbedService = new BuildEmbedService();

    function tweetsIdBuild(fullTweets: Array<any>, tweetsId: Array<any>): void {
      tweetsId.splice(0, tweetsId.length)
      fullTweets.forEach(
        (users: Record<string, any>) => users['tweetsData']['data'].forEach(
          
          (tweets: Record<string, string>) =>  tweetsId.push({
            'id': tweets['id'],
            'username': users.username,
            'created_at': new Date(tweets['created_at']),
            'author': tweets['author_id'],
          })
        )
      )

      tweetsId.sort((a: any, b: any) => b.created_at - a.created_at)
    }

    function idNextToken(fullDataUser: Array<any>) {
      const infoToGetTweet: Array<any> = [];
   
      function validatePosition(obj: object, prop: string) {
        try {
          if(obj.hasOwnProperty(prop)) {
            return true
          } else {
            return false
          }
        } catch {
          return false
        }
      }
      
   
      for(const data of fullDataUser) {
        let buildObject: Record<string, string | number> = {};

        if(validatePosition(data, 'tweetsData') && 
        validatePosition(data.tweetsData, 'meta')  && 
        validatePosition(data.tweetsData.meta, 'next_token')) {
          buildObject['next_token'] = data.tweetsData.meta.next_token
        }
        
        if(validatePosition(data, 'tweetsData') && 
        validatePosition(data.tweetsData, 'data')) {
          if(data.tweetsData.data.length >= 10) {
            continue
          } else if(data.tweetsData.data.length > 5) {
            buildObject['count'] = 5
          }else {
            buildObject['count'] = (10 - data.tweetsData.data.length)
          }
        } else {
          buildObject['count'] = 10
        }
   
        buildObject['id'] = data.id
        infoToGetTweet.push(buildObject)
      }
   
      return infoToGetTweet
    }

    async function rTweets(fullDataUser: Array<any>) {
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

    async function embedValidator(fullDataUser: Array<any>, tweetsId: Array<any>) {
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

    if(!this.fullDataUser.length){
      (await usersData.hook({
        usernames: usernames
        })).forEach((a) => {this.fullDataUser.push(a)})// do a validation if data not exist on fullDataUser
    }    

    const element = await buildEmbedService.hook({
       idTweets: embedValidator(this.fullDataUser, this.tweetsId)
    })

    return element
  }
}

export { GetTweetService }
