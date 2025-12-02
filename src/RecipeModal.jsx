import React, { useEffect, useState } from "react";
import { Client, Databases, Storage } from "appwrite";
import RecipeCard from "./RecipeCard";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

const databases = new Databases(client);
const storage = new Storage(client);

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE,
          "recipeitems"
        );

        const recipesWithImages = await Promise.all(
          response.documents.map(async (doc) => {
            let imageUrl = null;
            if (doc.image) {
              imageUrl = await storage.getFileView(
                import.meta.env.VITE_APPWRITE_BUCKET,
                doc.image
              );
            }
            return { ...doc, imageUrl };
          })
        );

        setRecipes(recipesWithImages);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <p>Loading recipes...</p>;

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.$id}
          title={recipe.title}
          ingredients={recipe.ingredients}
          procedure={recipe.procedure}
          imageUrl={recipe.imageUrl}
        />
      ))}
    </div>
  );
};

export default RecipeList;
