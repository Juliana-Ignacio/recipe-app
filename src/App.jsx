import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import RecipeForm from './RecipeForm.jsx';
import RecipeCard from './RecipeCard.jsx';
import RecipeModal from './RecipeModal.jsx';
import { databases, storage, ID } from "./appwrite";


function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const response = await databases.listDocuments("692e76dc0008790053d6", "recipeitems")
;

      setRecipes(response.documents);
    } catch (err) {
      console.error("Appwrite fetch error:", err);
    }
  };

  fetchRecipes();
}, []);




  const saveRecipes = (newRecipes) => {
    setRecipes(newRecipes);
    localStorage.setItem('recipes', JSON.stringify(newRecipes));
  };

  const addOrUpdateRecipe = (recipe) => {
    const index = recipes.findIndex(r => r.id === recipe.id);
    const newRecipes = index >= 0
      ? [...recipes.slice(0, index), recipe, ...recipes.slice(index + 1)]
      : [...recipes, recipe];
    saveRecipes(newRecipes);
  };

  const deleteRecipe = (id) => {
    saveRecipes(recipes.filter(r => r.id !== id));
    setSelectedRecipe(null);
  };

  return (
    <div>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="content-wrapper" style={{ paddingTop: '80px' }}>
        {currentPage === 'home' && (
          <div className="text-center text-black mb-4">
            <h1 className="fw-bold">🍳 Recipe Sharing</h1>
            <p className="opacity-75">Simple, everyday delicious meals.</p>
          </div>
        )}

        {currentPage === 'upload' && (
          <RecipeForm addOrUpdateRecipe={addOrUpdateRecipe} />
        )}

        {currentPage === 'recipes' && (
          <div className="row g-4">
            {recipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onClick={() => setSelectedRecipe(recipe)} 
                onDelete={() => deleteRecipe(recipe.id)}
                onEdit={() => setSelectedRecipe(recipe)}
              />
            ))}
          </div>
        )}

        {currentPage === 'about' && (
          <div className="text-black mt-5">
            <h2>About RecipeShare</h2>
            <p>This website allows you to upload, view, and share your favorite recipes with friends. Made with ReactJS and Bootstrap.</p>
          </div>
        )}

        {selectedRecipe && (
          <RecipeModal 
            recipe={selectedRecipe} 
            onClose={() => setSelectedRecipe(null)} 
            onDelete={() => deleteRecipe(selectedRecipe.id)}
            onEdit={(r) => setSelectedRecipe(r)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
