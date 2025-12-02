import React, { useState } from "react";
import { databases, storage, ID } from "./appwrite";

function RecipeForm({ addOrUpdateRecipe }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [procedure, setProcedure] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !ingredients || !procedure) {
      alert("Please fill all fields!");
      return;
    }

    let imageUrl = null;

    try {
      // Upload image if selected
      if (imageFile) {
        const uploadResult = await storage.createFile(
          "692e78c80002d75d1e70", // Your bucket ID
          ID.unique(),
          imageFile
        );
        imageUrl = uploadResult.$id; // store the file ID in your document
      }

      // Create document in Appwrite database
      const doc = await databases.createDocument(
        "692e76dc0008790053d6", // Database ID
        "recipeitems",          // Collection ID
        ID.unique(),
        {
          title: title,
          ingredients: ingredients,
          procedure: procedure,
          image: imageUrl,
        }
      );

      // Update local state
      addOrUpdateRecipe({
        id: doc.$id,
        title: doc.title,
        ingredients: doc.ingredients,
        procedure: doc.procedure,
        image: imageFile ? URL.createObjectURL(imageFile) : null,
      });

      // Reset form
      setTitle("");
      setIngredients("");
      setProcedure("");
      setImageFile(null);
      document.getElementById("recipeImgInput").value = "";

      alert("Recipe uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload recipe. Check console for details.");
    }
  };

  return (
    <div id="uploadCard" className="shadow-sm mb-4">
      <h4 className="text-center mb-3">Upload a Recipe</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          required
        />
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingredients (one per line)"
          required
        />
        <textarea
          value={procedure}
          onChange={(e) => setProcedure(e.target.value)}
          placeholder="Procedure"
          required
        />
        <input
          type="file"
          id="recipeImgInput"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <button type="submit" className="btn btn-success mt-2 w-100">
          Upload Recipe
        </button>
      </form>
    </div>
  );
}

export default RecipeForm;
