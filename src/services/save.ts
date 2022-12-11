import * as fs from 'fs'

interface iSave {
 dataUser: Record<string, any>
}
class Save {
 saveItem ({
  dataUser
 }: iSave) {
  // Convert the object to JSON

  const result = JSON.stringify(dataUser)

  // Write replacing current content
  fs.writeFileSync('src/data/fullDataUser.json', result)

    
 }

 readFile() {
  try{
   let file = fs.readFileSync('src/data/fullDataUser.json').toString()
   let res = JSON.parse(file)
   return res
  } catch(e: object | unknown) {
   return false
  }

 }
}
export { Save }