import needle from 'needle';

interface IEmbedTweet {
 idTweets: Promise<any>
}

class EmbedTweet {
 async hook({
  idTweets
 }: IEmbedTweet) {
  const htmlObjects = [];
  
  for(let id of await idTweets) {
   const resp = await needle('get', `https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2FInterior%2Fstatus%2F${id['id']}&omit_script=true`)
   htmlObjects.push(resp.body.html)
  }

  return htmlObjects
 }
}

export { EmbedTweet }
