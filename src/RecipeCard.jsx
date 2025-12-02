import React from "react";

const RecipeCard = ({ title, ingredients, procedure, imageUrl }) => {
  return (
    <div className="recipe-card">
      {imageUrl && <img src={imageUrl} alt={title} />}
      <h3>{title}</h3>
      <p><strong>Ingredients:</strong> {ingredients}</p>
      <p><strong>Procedure:</strong> {procedure}</p>
    </div>
  );
};

export default RecipeCard;
