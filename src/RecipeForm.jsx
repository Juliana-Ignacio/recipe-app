import React, { useState } from "react";
import { Client, Databases, Storage } from "appwrite";

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // e.g., https://fra.cloud.appwrite.io/v1
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);  // e.g., 692e75550014928a450b

const databases = new Databases(client);
const storage = new Storage(client);

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1️⃣ Upload image to Appwrite Storage if provided
      let fileId = null;
      if (image) {
        const uploadResult = await storage.createFile(
          import.meta.env.VITE_APPWRITE_BUCKET, // bucket ID
          "unique()" , // generate unique ID for file
          image
        );
        fileId = uploadResult.$id;
      }

      // 2️⃣ Create document in Appwrite Database
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE, // database ID
        "recipeitems",                           // collection ID
        "unique()",                               // document ID
        {
          title,
          ingredients,
          image: fileId ? fileId : null
        }
      );

      // Clear form after successful upload
      setTitle("");
      setIngredients("");
      setImage(null);
      alert("Recipe uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Ingredients:</label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          maxLength={5000}
          required
        />
      </div>
      <div>
        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload Recipe"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default RecipeForm;
