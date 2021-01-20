import "./App.css";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Recipe from "./Components/Recipe";
import RecipeView from "./Components/RecipeView";
import About from "./Components/About";



const App = () => {
  const AppHost = "951d4a18";
  const AppKey = "2fe6a45459f928199e8a6b6bf56962de";

  const [recipes, setRecipes] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [recipeCount, setRecipeCount] = useState();
  const [searchString, setSearchString] = useState("pierogi");
  const [isLoading, setIsLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    getRecipes();
  }, [activePage])

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  });

  const getRecipes = async () => {
    setIsLoading(true);
    setSearchString(searchString === "" ? "pierogi" : searchString);
    const firstRecipe = activePage === 1 ? 0 : (12 * activePage) - 11;
    const lastRecipe = firstRecipe + 12;

    const res = await fetch(
      `https://api.edamam.com/search?q=${searchString}&app_id=${AppHost}&app_key=${AppKey}&from=${firstRecipe}&to=${lastRecipe}&ealth=alcohol-free`,
      {
        method: "GET"
      }
    );
    const data = await res.json();
    console.log(data);
    setRecipeCount(data.count)
    setRecipes(data.hits);
    setIsLoading(false);
  };

  const handleSubmit = (event) => {
    setActivePage(1);
    getRecipes(searchString);
    event.preventDefault();
  };

  const handleChange = (e) => { 
    setSearchString(e.target.value);
    e.preventDefault();
  };

  const renderRecipes = () => {
    let classes;

    switch (true) {
      case (screenWidth >= 1480):
        classes = "col-2"
        break;
      case (screenWidth >= 992):
        classes = "col-3"
        break;
      case (screenWidth >= 768):
        classes = "col-4"
        break;
      case (screenWidth >= 576):
        classes = "col-6"
        break;  
      case  (screenWidth <= 576):
        classes = "col-12"
        break;
}
    return (
      recipes.map((recipe, index) => (
        <Link className={"text-decoration-none "+classes}
        to={`/recipe-view/${
          activePage === 1 ? 0 + index : (12 * activePage) - 11 + index}/${
          searchString}`
        }
        key={index}
        >
            <Recipe
              recipe={recipe.recipe}
              classString={(
                classes === "col-2" && (index + 1) % 6 === 0 ? "recipeDetailsR" : "recipeDetails" &&
                classes === "col-3" && (index + 1) % 4 === 0 ? "recipeDetailsR" : "recipeDetails" &&
                classes === "col-4" && (index + 1) % 3 === 0 ? "recipeDetailsR" : "recipeDetails" &&
                classes === "col-6" && (index + 1) % 2 === 0 ? "recipeDetailsR" : "recipeDetails" 
                )}
              />
          </Link>
      ))
    );
  }

  const handlePageChange = (pageNumber) =>  {
    setActivePage(pageNumber);
  }

  return (
    <Router>
      <Switch>
        <Route path="/list" exact >
          <div className="App container-fluid">
            <div className="AppTop">
              <h4 className="mr-5">Recipes</h4>
              <form className="row ml-2 mr-1 shadow" onSubmit={handleSubmit}>
                <div className="input-group">
                  <input type="text" className="form-control" onChange={handleChange} value={searchString}/>
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-primary">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="AppBody row justify-content-center"> 
              {isLoading ?
                <div className="spinner-border  m-3" role="status"></div> :
                renderRecipes()}
            </div>
            <div className="paginBar">   
              <Pagination
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={12}
                totalItemsCount={recipeCount-12 >=100 ? 100 : recipeCount - 12}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </Route>
        <Route path="/recipe-view/:recipe/:searchString" component={RecipeView} />
        <Route path="/" exact component={About} />
      </Switch>
    </Router>
  );
};

export default App;
