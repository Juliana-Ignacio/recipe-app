import React from 'react';

function RecipeCard({ recipe, onClick, onDelete, onEdit }) {
  return (
    <div className="col-md-4 col-sm-6">
      <div className="recipe-card shadow-sm">
        <div className="d-flex justify-content-end">
          <div className="dropdown">
            <span className="dots" data-bs-toggle="dropdown">⋮</span>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" onClick={onClick}>View</button></li>
              <li><button className="dropdown-item" onClick={onEdit}>Edit</button></li>
              <li><button className="dropdown-item text-danger" onClick={onDelete}>Delete</button></li>
            </ul>
          </div>
        </div>

        <img src={recipe.image} className="recipe-img" onClick={onClick} alt={recipe.title} />
        <div className="recipe-title">{recipe.title}</div>
      </div>
    </div>
  );
}

export default RecipeCard;
