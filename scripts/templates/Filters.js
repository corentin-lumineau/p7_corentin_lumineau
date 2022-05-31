import Filter from "./Filter.js";
import { removeIndexFilters } from "../utils/display.js";
export default class Filters {
  constructor(recipes) {
    this.recipes = recipes;
  }

  handleChevron = () => {
    const chevrons = document.getElementsByName("bloc-filter");
    chevrons.forEach((chevron) => {
      chevron.addEventListener("click", (event) => {
        const type = event.currentTarget.id;

        if (event.currentTarget.classList == "fas fa-chevron-down") {
          const containerFilter =
            event.currentTarget.parentElement.parentElement;
          const filterBloc = new Filter(this.recipes, containerFilter, type);
          filterBloc.render();
        } else {
          removeIndexFilters(event, type);
        }
      });
    });
  };

  createDom(types) {
    const container = document.querySelector(".container-filters");
    const containerFiltersWrapper = document.createElement("div");
    containerFiltersWrapper.classList.add("container-filters__wrapper");
    container.appendChild(containerFiltersWrapper);

    for (var i = 0; i < types.length; i++) {
      const blocFilterWrapper = document.createElement("div");
      const blocFilter = document.createElement("div");
      const blocTitle = document.createElement("div");
      const content = document.createElement("p");
      const chevron = document.createElement("i");

      blocFilterWrapper.classList.add("bloc-filter-wrapper");
      blocFilter.classList.add("bloc-filter");
      blocTitle.classList.add("bloc-filter__title");
      chevron.classList.add("fas");
      chevron.classList.add("fa-chevron-down");

      if (types[i] == "Ingrédients") {
        blocFilter.classList.add("bloc-filter--blue");
      } else if (types[i] == "Appareils") {
        blocFilter.classList.add("bloc-filter--green");
      } else {
        blocFilter.classList.add("bloc-filter--red");
      }

      content.innerText = types[i];
      chevron.setAttribute("id", types[i]);
      chevron.setAttribute("name", "bloc-filter");

      containerFiltersWrapper.appendChild(blocFilterWrapper);
      blocFilterWrapper.appendChild(blocFilter);
      blocFilter.appendChild(blocTitle);
      blocTitle.appendChild(content);
      blocTitle.appendChild(chevron);
    }
  }

  render() {
    var types = ["Ingrédients", "Appareils", "Ustensiles"];
    this.createDom(types);
    this.handleChevron();
  }
}
