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

  render() {
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
