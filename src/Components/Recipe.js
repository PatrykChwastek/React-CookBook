import React from 'react';

const Recipe = ({ recipe, classString }) => {
    const ingredients = recipe.ingredientLines;
    return (
        <div className="recipeCard row">
            <div className="card">
                <img className="card-img-top"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/300x300?text=No+Image"
                    }}
                    src={recipe.image}
                />
              <div className="p-3">
                    <h6 className="card-title">{recipe.label}</h6>
                    <hr/>
                    <p className="card-text">Calories:
                        {recipe.calories.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                </div>
            </div>
            <div className={classString}>
                <p className="m-1"><b>Ingredients:</b></p>
                <ul>   
                    {ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient}
                    </li>                       
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Recipe
