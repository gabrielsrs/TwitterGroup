import { Request, Response } from 'express';
import { UsersData } from "../../API/usersData";

class GroupSettingsController {
 async handle(request: Request, response: Response) {
  try {
  const reqCookie = request.cookies['groups']
  const groups = JSON.parse(reqCookie)

  const usersData = new UsersData();

  const result: any = {}

  for(const group in groups) {
   const infoUser = await usersData.hook({
    usernames: groups[group],
    fields: 'profile_image_url'
   })

   result[group] = infoUser
  }


  return response.render('groupsSettings', { 
   groups: result
  })
  } catch (err) {
   return response.render('groupsSettings', {
    groups: []
   })
  }
 }
}

export { GroupSettingsController }