import { Client , Account, ID} from "appwrite";
import config from '../configuration/config'

class Authentication{
    client = new Client()
    account

    Authentication(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId)
        this.account = new Account(this.client)
    }

    async signUp({name,email,password}){
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
        } catch (error) {
            console.log(`Auth :: sign Up :: ${error}`)
        }
    }
    
    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            )
        } catch (error) {
            console.log(`Auth :: Login :: ${error}`)
        }
    }

    async getUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log(`Auth:: getUser :: ${error}`)
            return null
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log(`Auth :: LogOut :: ${error}`)
        }
    }
}

const authentication = new Authentication();
export default authentication;