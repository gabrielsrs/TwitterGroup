interface ITweets {
 idTweets: Promise<any>
}


class BuildEmbedService {
 async hook({
  idTweets
 }: ITweets) {
  const url = [];

  for(const tweet of await idTweets) {
   url.push(`blockquote class="twitter-tweet"><a href="https://twitter.com/${tweet.username}/status/${tweet.id}"></a></blockquote`)
  }

  return url
 }
}

export { BuildEmbedService }
