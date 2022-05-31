import Recipe from "../models/Recipe.js";
import RecipeCard from "../templates/RecipeCard.js";
import { recipes } from "../../data/recipes.js";
import { resultSearch } from "../utils/search.js";
import { cleanRecipesContainer, displayNoResult } from "../utils/display.js";
import Filters from "../templates/Filters.js";

export var allRecipes = recipes;

/**
 * This function will accept an array of recipe object to create RecipeCardTemplate
 * @param {{id: Number, name: String, servings: Number, ingredients: Array, appliance: String, time: Number}[]} data The array containing all recipes object
 */

//Changer foreach pour ES5
export function display(data) {
  for (var i = 0; i < data.length; i++) {
    var model = new Recipe(data[i]);
    var template = new RecipeCard(model);
    template.render();
  }
}

function launchMainSearch() {
  if (searchBar.value.length > 2) {
    allRecipes = resultSearch(searchBar.value);
    if (allRecipes.length == 0) {
      displayNoResult();
    }
    //retirer les doublons via création d'un set
    /*  allRecipes = Array.from(new Set(allRecipes)); */ //Pas ES5
    allRecipes = allRecipes.filter(function (ele, pos) {
      return allRecipes.indexOf(ele) == pos;
    });
  } else {
    allRecipes = recipes;
  }

  document.querySelector(".container-filters__wrapper").remove();
  var filters = new Filters(allRecipes);
  filters.render();
  display(allRecipes);

  return allRecipes;
}

const searchBar = document.getElementById("search-bar");

searchBar.addEventListener("keyup", () => {
  cleanRecipesContainer();
  launchMainSearch();
});

const filters = new Filters(allRecipes);

filters.render();

display(allRecipes);
