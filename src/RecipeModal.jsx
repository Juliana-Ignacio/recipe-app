import React from 'react';
import { databases, storage, ID } from "./appwrite";


function RecipeModal({ recipe, onClose, onDelete, onEdit }) {
  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content shadow">
          <div className="modal-body">
            <img src={recipe.image} className="modal-img mb-3" alt={recipe.title} />
            <h2 className="fw-bold">{recipe.title}</h2>
            <h5 className="mt-3">Ingredients</h5>
            <ul>
              {(recipe.ingredients || []).map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
            <h5 className="mt-3">Procedure</h5>
            <p>{recipe.steps}</p>
            <div className="d-flex gap-2 mt-4">
              <button className="btn btn-primary w-50" onClick={onEdit}>Edit</button>
              <button className="btn btn-danger w-50" onClick={onDelete}>Delete</button>
            </div>
            <button className="btn btn-secondary w-100 mt-3" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;
