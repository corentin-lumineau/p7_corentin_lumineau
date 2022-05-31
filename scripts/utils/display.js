import { capitalize } from "../utils/tools.js";
import { checkTagAndDisabled } from "../utils/tools.js";

/**
 * This function will accept an array of object Recipe and a DOM Element
 * to create DOM element containing name of ingredients and will return the array of ingredients
 *
 * @type {HTMLElement} container the bloc where dom elements must be created
 * @param {{id: Number, name: String, servings: Number, ingredients: Array, appliance: String, time: Number}[]} recipes the array of Recipe object
 * @returns {array} The array of ingredients of the recipes
 */
export function displayAllElements(container, recipes, type) {
  if (container) {
    let arr = [];
    let domElements = [];
    switch (type) {
      case "Ingrédients":
        recipes.forEach((recipe) => {
          recipe.ingredients.forEach((element) => {
            arr.push(element.ingredient);
          });
        });
        break;
      case "Appareils":
        recipes.forEach((recipe) => {
          arr.push(recipe.appliance);
        });
        break;
      case "Ustensiles":
        recipes.forEach((recipe) => {
          recipe.ustensils.forEach((element) => {
            arr.push(element);
          });
        });
        break;
    }

    arr = arr.map((element) => element.toUpperCase());
    arr = [...new Set(arr)];
    arr = arr.map((element) => capitalize(element));

    arr.map((element) => {
      const blocElement = document.createElement("div");
      blocElement.classList.add("element");
      blocElement.innerText = element;
      blocElement.setAttribute("name", type);
      container.appendChild(blocElement);
      domElements.push(blocElement);
    });
    checkTagAndDisabled(domElements);

    return domElements;
  }
}

/**
 * This function will clean the bloc filters and create a new one
 * @returns {HTMLElement} The new bloc for filters
 */
export const cleanContainerBloc = (container) => {
  container.remove();
  const blocIndex = document.createElement("div");
  blocIndex.classList.add("bloc-filter__index");

  return blocIndex;
};

/**
 * This function will accept an array containing ingredients
 * and create the DOM element for the filters
 * @param {string[]} data The array of ingredients
 */
export function displayElementsSearch(data) {
  const container = document.querySelector(".bloc-filter__index");

  data.forEach((element) => {
    container.appendChild(element);
  });
}

/**
 * This function will accept a string contaning
 * the name of the selected element and create the tag bloc contaning
 *
 * @param {string} selectedElement the string containing the name of the ingredient
 * @returns {HTMLElement} return the dom element for the tag
 */

export function createBlocSelectedElement(selectedElement) {
  const containerSelectedElements = document.querySelector(
    ".container-filters__selected-elements"
  );

  const blocElement = `<div class='bloc-element'>
    <p>${selectedElement}</p>
    <i class="fas fa-times"></i>
   </div>`;
  containerSelectedElements.innerHTML += blocElement;

  return containerSelectedElements;
}

/**
 * This function will remove the block container containing the elements of a filter
 * @param {*} event The click on the arrow
 */
export function removeIndexFilters(event, type) {
  event.currentTarget.classList = "fas fa-chevron-down";
  event.currentTarget.parentNode.nextElementSibling.remove();
  event.currentTarget.previousElementSibling.remove();
  event.currentTarget.parentNode.insertAdjacentHTML(
    "afterbegin",
    `<p>${type}</p>`
  );
}

/**
 * This function will remove all the RecipeCards of the main Container
 */

export function cleanRecipesContainer() {
  const mainContainer = document.querySelector(".main-container-wrapper");
  const container = document.querySelector(".recipes-container");
  container.remove();
  const newContainer = document.createElement("div");
  newContainer.classList.add("recipes-container");
  mainContainer.appendChild(newContainer);
}

export function displayTagElementsSearch(elements, type, container) {
  const domElements = [];
  const blocIndex = container.querySelector(".bloc-filter__index");
  elements = Array.from(new Set(elements));
  elements.forEach((element) => {
    const blocElement = document.createElement("div");
    blocElement.classList.add("element");
    blocElement.innerText = element;
    blocElement.setAttribute("name", type);
    blocIndex.appendChild(blocElement);
    domElements.push(blocElement);
  });
  checkTagAndDisabled(domElements);

  return domElements;
}

export function displayNoResult() {
  var recipesContainer = document.querySelector(".recipes-container");
  recipesContainer.innerText =
    "Aucune recette ne correspond à vos critères...vous pouvez chercher 'tartes aux pommes', 'poisson'";
}
