import React, { useEffect, useState } from "react";
import "./RecipeView.css";
const RecipeView = ({ match })=> {
    

    const AppHost = "951d4a18";
    const AppKey = "2fe6a45459f928199e8a6b6bf56962de";
    const [recipeInfo, setRecipeInfo] = useState({});

    useEffect(() => {
        if (recipeInfo.label===undefined) {
            getRecipe();
        }
    });

    const getRecipe = async () => {
        const firstRecipe = match.params.recipe === 0 ? 0 : match.params.recipe;
        const lastRecipe = firstRecipe+1;

        const res = await fetch(
            `https://api.edamam.com/search?q=${match.params.searchString}&app_id=${AppHost}&app_key=${AppKey}&from=${firstRecipe}&to=${lastRecipe}&ealth=alcohol-free`,
            {
                method: "GET"
            }
        );
        const resData = await res.json();
        setRecipeInfo(resData.hits[0].recipe);    
    };

    return (
        <div className="recipeContener row">           
            <div className="row wrapper justify-content-center">
                <div className="col-md-6 col-sm-12">
                    <h5 className="bottom-0 m-3">{recipeInfo.label}</h5>
                    <div className="p-3">
                        <img className="card-img"
                            src={recipeInfo.image === null ? "https://via.placeholder.com/300x300?text=No+Image" : recipeInfo.image}
                        />
                    </div>
                    <div className="card m-3">
                        <div className="card-header">
                            Health
                        </div>
                        <div className="d-flex flex-wrap flex-row p-2">{
                            recipeInfo.healthLabels !== undefined ?
                                recipeInfo.healthLabels.map((item, index) => (
                                    <span key={index} className="badge badge-success m-1">{item}</span>                                   
                                )) : <div></div>} {                                
                            recipeInfo.cautions !== undefined ?
                                    recipeInfo.cautions.map((item, index) => (
                                    <span key={index} className="badge badge-warning m-1">{item}</span>
                                )) : <div></div>}     
                        </div>
                    </div>
                    <a href={recipeInfo.url !== undefined ? recipeInfo.url:""} className="card text-decoration-none flex-row align-items-center m-3 p-2">
                        <button  className="btn btn-primary" type="button">Preparation</button>
                        <div className="m-1">on { recipeInfo.url !== undefined ?
                            recipeInfo.url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0] : ""}
                        </div>
                    </a>
                    <div className="card m-3">
                        <div className="card-header">
                            Nutrients
                        </div>
                        <ul className="list-group d-flex flex-wrap flex-row list-group-flush">{
                            recipeInfo.digest !== undefined ?
                            recipeInfo.digest.map((item, index) => (
                                <li key={index} className="list-group-item col-4">
                                    {item.label+': '}
                                    {item.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    {item.unit}
                                </li>
                            )) : <div></div>}
                        </ul>
                    </div>    
                </div>
                <div className="col-md-5 card col-sm-12 IngredientList">
                    <h5 className="p-2">Ingredients:</h5>
                    {
                    recipeInfo.ingredients !== undefined ?
                    recipeInfo.ingredients.map((ingredient, index) => (
                        <div key={index} className="row no-gutters flex-row card m-2 ">
                            <img className="card-img col-3"
                                src={ingredient.image === null ? "https://via.placeholder.com/300x300?text=No+Image" :
                                     ingredient.image} />
                            <div className="col-9 p-1 ">{ingredient.text}</div>
                        </div>
                    )):<div></div>}
                </div> 
            </div>
        </div>
    );
}
export default RecipeView

