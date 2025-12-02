import React, { useState } from "react";
import { Client, Databases, Storage, ID } from "appwrite";

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

const databases = new Databases(client);
const storage = new Storage(client);

const RecipeForm = ({ onNewRecipe }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [procedure, setProcedure] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1️⃣ Upload image to Appwrite Storage
      let fileId = null;
      let imageUrl = null;

      if (image) {
        const uploadResult = await storage.createFile(
          import.meta.env.VITE_APPWRITE_BUCKET,
          ID.unique(),
          image
        );
        fileId = uploadResult.$id;

        // Get a public URL for the image
        imageUrl = await storage.getFileView(
          import.meta.env.VITE_APPWRITE_BUCKET,
          fileId
        );
      }

      // 2️⃣ Create document in Appwrite Database
      const document = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE,
        "recipeitems",
        ID.unique(),
        {
          title,
          ingredients,
          procedure,
          image: fileId || null,
        }
      );

      // Include imageUrl for immediate display
      const newRecipe = { ...document, imageUrl };

      // Clear form
      setTitle("");
      setIngredients("");
      setProcedure("");
      setImage(null);

      // Callback to update recipe list in parent
      if (onNewRecipe) onNewRecipe(newRecipe);

      alert("Recipe uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
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
        <label>Procedure:</label>
        <textarea
          value={procedure}
          onChange={(e) => setProcedure(e.target.value)}
          maxLength={10000}
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
