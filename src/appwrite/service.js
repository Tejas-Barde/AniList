import { Client, Databases, ID, Permission, Query, Role, Storage } from "appwrite";
import config from "../configuration/config";

class Service {
  client;
  storage;
  database;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteUrl)
      .setProject(config.projectId)
    this.database = new Databases(this.client)
    this.storage = new Storage(this.client);
  }

  async addAnimeData(anime) {
    try {
      return await this.database.createDocument(
        config.databaseId,
        config.collection2Id,
        anime.anime_id.toString(),
        {
          "anime_id": anime.anime_id,
          "image_url": anime.image_url,
          "episodes": anime.episodes,
          "title": anime.title,
          "genres": anime.genres
        }
      )
    } catch (error) {
      console.log(`service :: addAnimeData :: ${error}`)
    }
  }

  async addAnime({ userId, anime }) {
    try {
      const animeData = await this.addAnimeData(anime);
      return await this.database.createDocument(
        config.databaseId,
        config.collectionId,
        ID.unique(),
        {
          "userId": userId,
          "rating": anime.rating,
          "status": anime.status,
          "anime_id": anime.anime_id
        },
        [
          Permission.read(Role.user(userId)),
          Permission.write(Role.user(userId))
        ]
      )
    } catch (error) {
      console.log(`Error :: createDoc :: ${error}`)
    }
  }

  async getAnimeList({ userId, query = [] }) {
    try {
      const response = await this.database.listDocuments(
        config.databaseId,
        config.collectionId,
        [
          Query.equal('userId', userId),
          ...query
        ]
      );
      const animeList = await Promise.all(response.documents.map(async (doc) => {
        try {
          console.log(doc);
          const anime = await this.database.getDocument(
            config.databaseId,
            config.collection2Id,
            doc.anime_id.toString()
          );
          return {
            ...anime,
            rating: doc.rating,
            status: doc.status
          }
        } catch (error) {
          console.log(`service :: getAnimeList :: Promise all :: ${error}`)
        }
      }))
      return animeList.filter(anime => anime !== null);
      // console.log(`service :: getAnimeList :: response ::`)
      // console.log(response)
    } catch (error) {
      console.log(`Error :: get Anime List :: ${error}`)
      return null;
    }
  }

  async update({ userId, anime_id,rating,status}) {
    try {
      console.log(`service :: update :: userId: ${userId}, anime_id: ${anime_id}, rating: ${rating}, status: ${status}`);
      // Check if the document exists
      const result = await this.database.listDocuments(
        config.databaseId,
        config.collectionId,
        [
          Query.equal('userId', userId),
          Query.equal('anime_id', anime_id)
        ]
      );
      if (result.documents.length > 0) {
        console.log(`service :: update :: found document for userId: ${userId}, anime_id: ${anime_id}`);
        const docId = result.documents[0].$id
        await this.database.updateDocument(
          config.databaseId,
          config.collectionId,
          docId,
          {
            "rating": rating, 
            "status": status
          }
        )
      }
      return true
    } catch (error) {
      console.log(`Error :: Update :: ${error}`)
      return false
    }
  }

  async removeAnime({ userId, anime_id }) {
    console.log(`service :: removeAnime :: userId: ${userId}, anime_id: ${anime_id}`);
    try {
      const result = await this.database.listDocuments(
        config.databaseId,
        config.collectionId,
        [
          Query.equal('userId', userId),
          Query.equal('anime_id', anime_id)
        ]
      );

      if (result.documents.length > 0) {
        const docId = result.documents[0].$id;

        await this.database.deleteDocument(
          config.databaseId,
          config.collectionId,
          docId
        );

        console.log(`service :: removeAnime :: successfully deleted document ${docId}`);
      } else {
        console.log(`service :: removeAnime :: no matching document found`);
      }

      return true;
    } catch (error) {
      console.log(`Error :: removeAnime :: ${error}`);
      return false;
    }
  }

}

const service = new Service();
export default service;