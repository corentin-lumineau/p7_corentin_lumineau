import Recipe from "../models/Recipe.js";
import RecipeCard from "../templates/RecipeCard.js";
import { recipes } from "../../data/recipes.js";
import { resultSearch } from "../utils/search.js";
import { cleanRecipesContainer, displayNoResult } from "../utils/display.js";
import Filters from "../templates/Filters.js";

export let allRecipes = recipes;

/**
 * This function will accept an array of recipe object to create RecipeCardTemplate
 * @param {{id: Number, name: String, servings: Number, ingredients: Array, appliance: String, time: Number}[]} data The array containing all recipes object
 */

export function display(data) {
  data.forEach((recipe) => {
    const model = new Recipe(recipe);
    const template = new RecipeCard(model);
    template.render();
  });
}

function launchMainSearch() {
  if (searchBar.value.length > 2) {
    if (allRecipes.length == 0) {
      displayNoResult();
    }
    allRecipes = resultSearch(searchBar.value);
    //retirer les doublons via création d'un set
    allRecipes = Array.from(new Set(allRecipes));
  } else {
    allRecipes = recipes;
  }
  document.querySelector(".container-filters__wrapper").remove();
  const filters = new Filters(allRecipes);
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
