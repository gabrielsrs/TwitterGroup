export function idNextToken(fullDataUser: Array<any>) {
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