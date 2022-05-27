export default class RecipeCard {
  constructor(data) {
    this._data = data;
  }

  render() {
    const { _name, _time, _ingredients, _description, _appliance, _ustensils } =
      this._data;
    const container = document.querySelector(".recipes-container");
    const allMyIngredients = () =>
      _ingredients.map((i) => {
        return `<p>${i.ingredient}:${i.quantity}</p>`;
      });

    const recipeCard = `
    <div class="recipe-card">
    <div class="recipe-card__illustration">
      <img src="assets/limonade_coco.jpg" alt="illustration" />
    </div>
    <div class="recipe-card__infos">
      <div class="recipe-card__infos__title">
        <p>${_name}</p>
        <div class="recipe-card__infos__title__time">
          <i class="far fa-clock"></i>
          <p>${_time}</p>
        </div>
      </div>
      <div class="recipe-card__infos__description">
        <div class="recipe-card__infos__description__ingredients">
          ${allMyIngredients().join(" ")}
        </div>
        <p class="recipe-card__infos__description__details">
         ${_description}
         
        </p>
      </div>
    </div>
  </div>
    `;

    container.innerHTML += recipeCard;

    /*  _ingredients.forEach((i) => {
      const blocIngredient = document.createElement("p");
      blocIngredient.innerHTML = `${i.ingredient}:${i.quantity}`;
      containerIngredient.appendChild(blocIngredient);
    }); */
  }
}
