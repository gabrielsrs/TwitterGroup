export function tweetsIdBuild(fullTweets: Array<any>, tweetsId: Array<any>): void {
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