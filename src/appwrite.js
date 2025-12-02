import { Client, Databases, Storage, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")  // your endpoint
  .setProject("692e75550014928a450b");              // your project ID

export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID };
