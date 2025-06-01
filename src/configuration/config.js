const config = {
    projectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL)
}

export default config;
