import { Client,Databases,ID,Permission,Query,Storage } from "appwrite";
import config from "../configuration/config";

class Service{
    client;
    storage;
    database;

    constructor(){
        this.client = new Client()
        .setEndpoint(config.appwriteUrl)
        .setProject(config.projectId)
        this.database = new Databases(this.client)
        this.storage = new Storage(this.database);        
    }

    async addAnime({userId,animeId,rating,status}){
        try {
            return await this.database.createDocument(
                config.databaseId,
                config.collectionId,
                ID.unique(),
                {
                    "userId" : userId,
                    "rating" : rating,
                    "status" : status,
                    "animeId" : animeId
                }
            )
        } catch (error) {
            console.log(`Error :: createDoc :: ${error}`)
        }
    }
    
    async getAnimeList({userId,query = []}){
        try {
            return await this.database.listDocuments(
                config.databaseId,
                config.collectionId,
                [
                    Query.equal('userId',userId),
                    ...query
                ]
            )
        } catch (error) {
            console.log(`Error :: get Anime List :: ${error}`)
            return null;
        }
    }
    
    async update({userId,animeId,rating,status}){
        try {
            const result = this.getAnimeList(userId,[
                Query.equal('animeId',animeId)
            ])
            if(result.documents.length > 0){
                const docId = result.documents[0].$id
                await this.database.deleteDocument(
                    config.databaseId,
                    config.collectionId,
                    docId,
                    {
                        "rating":rating,
                        "status":status
                    }
                )
            }
            return true
        } catch (error) {
            console.log(`Error :: get Anime List :: ${error}`)
            return false
        }
    }

    async removeAnime(userId,animeId){
        try {
            const result = this.getAnimeList(userId,[
                Query.equal('animeId',animeId)
            ])
            if(result.documents.length > 0){
                const docId = result.documents[0].$id
                await this.database.deleteDocument(
                    config.databaseId,
                    config.collectionId,
                    docId
                )
            }
            return true
        } catch (error) {
            console.log(`Error :: get Anime List :: ${error}`)
            return false
        }
    }
}

const service = new Service();
export default service;