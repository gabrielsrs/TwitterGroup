import { UsersData } from '../../API/usersData';
import { BuildEmbedService } from './buildEmbedService'
import { Save } from '../utils/save'

import { embedValidator } from '../utils/embedValidator';

interface INames {
  usernames: Array<string>
}

class GetTweetService{
  fullDataUser: Array<any> = [];
  tweetsId: Array<any> = [];

 async getTweets({
  usernames
 }: INames) {
    const usersData = new UsersData();
    const buildEmbedService = new BuildEmbedService();
    const save = new Save();

    const data = save.readFile();
    if(data){
      this.fullDataUser = [...this.fullDataUser, ...data];
    }

    if(!this.fullDataUser.length){
      (await usersData.hook({
        usernames: usernames
        })).forEach((a) => {this.fullDataUser.push(a)})// do a validation if data not exist on fullDataUser
    }    

    const element = await buildEmbedService.hook({
       idTweets: embedValidator(this.fullDataUser, this.tweetsId)
    })

    save.saveItem({
      dataUser: this.fullDataUser
    })

    return element
  }
}

export { GetTweetService }
