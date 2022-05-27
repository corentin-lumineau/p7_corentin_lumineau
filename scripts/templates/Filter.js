import Tag from "../templates/Tag.js";
import {
  cleanContainerBloc,
  displayAllElements,
  displayElementsSearch,
  cleanRecipesContainer,
} from "../utils/display.js";
import { specificSearch } from "../utils/search.js";
import { blocElementSearch } from "../utils/search.js";
import { display } from "../pages/homepage.js";
import Filters from "./Filters.js";
import { checkTagAndDisabled } from "../utils/tools.js";

export default class Filter {
  constructor(recipes, containerFilter, type) {
    this.recipes = recipes;
    this.container = containerFilter;
    this.type = type;
  }

  /**
   *
   * This function will load all the specific element of the bloc filters into the container-filters
   *
   * @type {HTMLElement} blocIndex
   */

  loadFiltersElement = (blocIndex, blocSearchElement) => {
    let allElements = displayAllElements(blocIndex, this.recipes, this.type);
    const searchBar = document.getElementById(`search-${this.type}`);

    allElements.forEach((element) => {
      if (element.classList == "element") {
        element.addEventListener("click", (event) => {
          element.classList.add("element--disabled");
          this.handleClickOnElement(
            this.recipes,
            event.currentTarget.innerHTML,
            this.type
          );
        });
      }
    });

    blocSearchElement.addEventListener("keyup", (event) => {
      const newBlocIndex = cleanContainerBloc(
        this.container.querySelector(".bloc-filter__index")
      );
      this.container.appendChild(newBlocIndex);

      if (searchBar.value.length > 2) {
        allElements = specificSearch(event.currentTarget.value, allElements);
        displayElementsSearch(allElements);
      } else {
        displayAllElements(newBlocIndex, this.recipes, this.type);
      }
    });
  };

  /**
   * This function will accept an array of Recipe object and call the searchBloc function to display the last level of filters in the
   * recipes container
   * @param {{id: Number, name: String, servings: Number, ingredients: Array, appliance: String, time: Number}[]} allRecipes
   */

  handleClickOnElement = (recipes, element, type) => {
    cleanRecipesContainer();

    const blocTag = new Tag(element, type, recipes);
    blocTag.render();

    const newRecipes = blocElementSearch(recipes, element, this.type);
    display(newRecipes);

    const filters = new Filters(newRecipes);
    filters.render();
    document.querySelector(".container-filters__wrapper").remove();
  };

  removeIndexFiltersOnClick = () => {
    const container = this.container.querySelector(".bloc-filter__index");
    const input = this.container.querySelector("input");
    const chevron = this.container.querySelector("i");
    const parent = this.container.querySelector(".bloc-filter__title");
    const newChild = document.createElement("p");
    newChild.innerText = this.type;
    parent.replaceChild(newChild, input);
    chevron.classList = "fas fa-chevron-down";
    container.remove();
  };

  render() {
    const blocIndex = document.createElement("div");
    const blocTitle = this.container.firstElementChild;
    const blocSearchElement = document.createElement("input");
    blocSearchElement.setAttribute("type", "text");
    blocSearchElement.setAttribute("placeholder", `Rechercher un ${this.type}`);
    blocSearchElement.setAttribute("id", `search-${this.type}`);
    blocIndex.classList.add("bloc-filter__index");
    this.container.querySelector("i").classList = "fas fa-chevron-up";
    //utiliser closest plutôt que firstElementChild *2
    this.container.firstElementChild.firstElementChild.remove();
    this.container.appendChild(blocIndex);
    blocTitle.insertBefore(blocSearchElement, blocTitle.children[0]);

    this.loadFiltersElement(blocIndex, blocSearchElement);
  }
}
