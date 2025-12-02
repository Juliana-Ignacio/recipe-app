import React from "react";

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div 
      className="recipe-card"
      style={{
        width: "200px",
        height: "200px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        margin: "10px"
      }}
      onClick={onClick}
    >
      {recipe.image ? (
        <img 
          src={`https://fra.cloud.appwrite.io/v1/storage/buckets/${process.env.VITE_APPWRITE_BUCKET}/files/${recipe.image}/view?project=${process.env.VITE_APPWRITE_PROJECT}`} 
          alt={recipe.title} 
          style={{ width: "100%", height: "120px", objectFit: "cover" }}
        />
      ) : (
        <div style={{ height: "120px", background: "#eee" }}></div>
      )}
      <h3>{recipe.title}</h3>
    </div>
  );
};

export default RecipeCard;
