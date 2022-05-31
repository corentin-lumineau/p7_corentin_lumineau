import Filters from "./Filters.js";

import { removeTagSearch } from "../utils/search.js";
import { display } from "../pages/homepage.js";
import { cleanRecipesContainer } from "../utils/display.js";
import { allRecipes } from "../pages/homepage.js";

export default class Tag {
  constructor(element, type, recipes) {
    this.element = element;
    this.type = type;
    this.recipes = recipes;
    if (!Tag.allInstances) {
      Tag.allInstances = [];
    }
    Tag.allInstances.push(this);
  }

  removeTag(closeButton) {
    closeButton.addEventListener("click", (event) => {
      event.currentTarget.parentElement.remove();
      cleanRecipesContainer();

      const newInstances = Tag.allInstances.filter((tag) => {
        return (
          tag.element != event.currentTarget.parentElement.firstChild.innerHTML
        );
      });

      Tag.allInstances = newInstances;

      let newRecipes = removeTagSearch(allRecipes, Tag.allInstances);
      newRecipes = Array.from(new Set(newRecipes));

      display(newRecipes);

      document.querySelector(".container-filters__wrapper").remove();

      const filters = new Filters(newRecipes);
      filters.render();

      /*  document.querySelector(".container-filters__wrapper").remove();
      const filters = new Filters(newRecipes);
      filters.render(); */
    });
  }

  render() {
    const containerSelectedElements = document.querySelector(
      ".container-filters__selected-elements"
    );

    const blocElement = document.createElement("div");
    blocElement.classList.add("bloc-element");
    switch (this.type) {
      case "Ingrédients":
        blocElement.classList.add("bloc-element--blue");

        break;
      case "Appareils":
        blocElement.classList.add("bloc-element--green");
        break;
      case "Ustensiles":
        blocElement.classList.add("bloc-element--red");
        break;
    }

    const element = document.createElement("p");
    element.textContent = `${this.element}`;

    const close = document.createElement("i");
    close.classList.add("fas");
    close.classList.add("fa-times");

    blocElement.appendChild(element);
    blocElement.appendChild(close);

    containerSelectedElements.appendChild(blocElement);

    this.removeTag(close);
  }
}
