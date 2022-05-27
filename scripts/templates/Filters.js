import Filter from "./Filter.js";
import { removeIndexFilters } from "../utils/display.js";
export default class Filters {
  constructor(recipes) {
    this.recipes = recipes;
  }

  /* refreshFilters = (recipes) => {
    const filterContainers = document.querySelectorAll(".bloc-filter__index");
    filterContainers.forEach((container) => {
      const mainContainerFilter = container.parentElement;
      const type = mainContainerFilter.querySelector("i").id;
      cleanContainerBloc(container);
      const filterBloc = new Filter(recipes, mainContainerFilter, type);
      filterBloc.render();
    });
  }; */

  //Pas ES5
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
          //Mettre cette methode dans la classe filter
          removeIndexFilters(event, type);
        }
      });
    });
  };

  render() {
    // Faire une boucle pour créer le bloc en rentrant les arguments necessaires
    const container = document.querySelector(".container-filters");
    const dom = `
    <div class="container-filters__wrapper">
      <div class="bloc-filter-wrapper">
        <div class="bloc-filter bloc-filter--blue">
          <div class="bloc-filter__title">
            <p>Ingrédients</p>
            <i class="fas fa-chevron-down" id="Ingrédients" name="bloc-filter"></i>
          </div>
        </div>
      </div>
      <div class="bloc-filter-wrapper">
        <div class="bloc-filter bloc-filter--green">
          <div class="bloc-filter__title">
            <p>Appareils</p>
            <i class="fas fa-chevron-down" id="Appareils" name="bloc-filter"></i>
          </div>
        </div>
      </div>
      <div class="bloc-filter-wrapper">
        <div class="bloc-filter bloc-filter--red">
          <div class="bloc-filter__title">
            <p>Ustensiles</p>
            <i class="fas fa-chevron-down" id="Ustensiles" name="bloc-filter"></i>
          </div>
        </div>
      </div>
    </div>`;

    container.insertAdjacentHTML("beforeend", dom);
    this.handleChevron();
  }
}
