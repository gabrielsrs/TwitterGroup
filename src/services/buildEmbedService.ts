interface ITweets {
 idTweets: Promise<any>
}


class BuildEmbedService {
 async hook({
  idTweets
 }: ITweets) {
  const urls = [];

  for(const tweet of await idTweets) {
   urls.push(`blockquote class="twitter-tweet"><a href="https://twitter.com/${tweet.username}/status/${tweet.id}"></a></blockquote`)
  }

  return urls
 }
}

export { BuildEmbedService }
