import { allRecipes } from "../pages/homepage.js";

/**
 * This function will accept an input from the main searchbar and call all main type of research on it to return the filtered array
 * @param {string} input the value from the searchbar
 * @returns {{id: Number, name: String, servings: Number, ingredients: Array, appliance: String, time: Number}[]} the array of filtered Recipe object
 */
export function resultSearch(input) {
  const arr = [];
  allRecipes.forEach((recipe) => {
    titleSearch(input, recipe);
    descriptionSearch(input, recipe);
    recipe.ingredients.forEach((ingredient) => {
      ingredientsSearch(input, ingredient, recipe);
    });
  });

  //Title search
  function titleSearch(input, recipe) {
    if (recipe.name.toUpperCase().includes(input.toUpperCase())) {
      arr.push(recipe);
    }
  }
  //Ingredients search
  function ingredientsSearch(input, ingredients, recipe) {
    if (ingredients.ingredient.toUpperCase().includes(input.toUpperCase())) {
      arr.push(recipe);
    }
  }
  //Description search
  function descriptionSearch(input, recipe) {
    if (recipe.description.toUpperCase().includes(input.toUpperCase())) {
      arr.push(recipe);
    }
  }

  return arr;
}

//specific search

/**
 * This function will accept an input and a list of elements to return an array of elements based on the input.
 * Then it will return a list of filtered elements
 * @param {string} input the value from the specific searchbar
 * @param {string[]} elements the array of elements
 * @returns {string[]} the array of filtered elements
 */
export function specificSearch(input, elements) {
  let arr = [];

  elements.forEach((element) => {
    if (element.innerHTML.toUpperCase().includes(input.toUpperCase())) {
      arr.push(element);
    }
  });
  return arr;
}

//bloc element search

/**
 * This function will accept a list of recipes and an input corresponding to the name of the bloc selected.
 * It will return an array of recipes
 * @param {{id: Number, name: String, servings: Number, ingredients: Array, appliance: String, time: Number}[]} recipes the array of recipes
 * @param {string} element the name of the bloc selected
 * @returns {{id: Number, name: String, servings: Number, ingredients: Array, appliance: String, time: Number}[]} the array of filtered Recipes
 */
export function blocElementSearch(recipes, element, type) {
  let arr = [];

  switch (type) {
    case "Ingrédients":
      recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          if (ingredient.ingredient.toUpperCase() === element.toUpperCase()) {
            arr.push(recipe);
          }
        });
      });
      break;
    case "Appareils":
      recipes.forEach((recipe) => {
        if (recipe.appliance.toUpperCase() === element.toUpperCase()) {
          arr.push(recipe);
        }
      });
      break;
    case "Ustensiles":
      recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
          if (ustensil.toUpperCase() === element.toUpperCase()) {
            arr.push(recipe);
          }
        });
      });
      break;
  }

  return arr;
}

//RemoveTag search

export function removeTagSearch(recipes, tags) {
  let arr = [];
  if (tags.length != 0) {
    tags.forEach((tag) => {
      switch (tag.type) {
        case "Ingrédients":
          recipes.forEach((recipe) => {
            recipe.ingredients.forEach((ingredient) => {
              if (
                ingredient.ingredient.toUpperCase() ===
                tag.element.toUpperCase()
              ) {
                arr.push(recipe);
              }
            });
          });
          break;
        case "Appareils":
          recipes.forEach((recipe) => {
            if (recipe.appliance.toUpperCase() === tag.element.toUpperCase()) {
              arr.push(recipe);
            }
          });
          break;
        case "Ustensiles":
          recipes.forEach((recipe) => {
            recipe.ustensils.forEach((ustensil) => {
              if (ustensil.toUpperCase() === tag.element.toUpperCase()) {
                arr.push(recipe);
              }
            });
          });
          break;
      }
    });
    arr = sortRemoveTagSearch(arr, tags);
  } else {
    arr = recipes;
  }
  return arr;
}

function sortRemoveTagSearch(recipes, tags) {
  const sortArray = [];
  recipes.forEach((recipe) => {
    if (
      checkIngredients(recipe, tags).includes("ko") ||
      checkUstensils(recipe, tags).includes("ko") ||
      checkAppliance(recipe, tags).includes("ko")
    ) {
      return false;
    } else {
      sortArray.push(recipe);
    }
  });

  return sortArray;
}

function checkIngredients(recipe, tags) {
  const res = [];
  tags.forEach((tag) => {
    if (tag.type == "Ingrédients") {
      if (
        recipe.ingredients.some(
          ({ ingredient }) =>
            ingredient.toUpperCase() == tag.element.toUpperCase()
        )
      ) {
        res.push("ok");
      } else {
        res.push("ko");
      }
    }
  });
  return res;
}

function checkUstensils(recipe, tags) {
  const res = [];
  tags.forEach((tag) => {
    if (tag.type == "Ustensiles") {
      if (recipe.ustensils.includes(tag.element)) {
        res.push("ok");
      } else {
        res.push("ko");
      }
    }
  });
  return res;
}

function checkAppliance(recipe, tags) {
  const res = [];
  tags.forEach((tag) => {
    if (tag.type == "Appareils") {
      if (recipe.appliance == tag.element) {
        res.push("ok");
      } else {
        res.push("ko");
      }
    }
  });
  return res;
}
