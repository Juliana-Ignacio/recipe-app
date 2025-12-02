import { Client, Databases, Storage } from "appwrite";

// Initialize the Appwrite client
const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your Appwrite endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT); // Your project ID

// Initialize databases and storage services
const databases = new Databases(client);
const storage = new Storage(client);

export { client, databases, storage };
