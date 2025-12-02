import React, { useEffect, useState } from "react";
import { Client, Databases, Storage } from "appwrite";
import RecipeCard from "./RecipeCard";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

const databases = new Databases(client);
const storage = new Storage(client);

const RecipeModal = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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
    <div>
      <div
        className="recipe-list"
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.$id}
            recipe={recipe}
            onClick={() => setSelectedRecipe(recipe)}
          />
        ))}
      </div>

      {selectedRecipe && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "80%",
              maxWidth: "500px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedRecipe.title}</h2>
            {selectedRecipe.imageUrl && (
              <img
                src={selectedRecipe.imageUrl}
                alt={selectedRecipe.title}
                style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
              />
            )}
            <h4>Ingredients</h4>
            <p>{selectedRecipe.ingredients}</p>
            <h4>Procedure</h4>
            <p>{selectedRecipe.procedure}</p>
            <button
              onClick={() => setSelectedRecipe(null)}
              style={{ marginTop: "10px" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeModal;
