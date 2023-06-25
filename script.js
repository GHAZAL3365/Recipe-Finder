const userInpEl = document.querySelector("#user-inp");
const resultEl = document.querySelector("#result");
const searchBtnEl = document.querySelector("#search-btn");

const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtnEl.addEventListener("click", () => {
  let userInpValue = userInpEl.value;
  if (userInpValue.length == 0) {
    resultEl.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
  } else {
    getRecipe(userInpValue);
  }
});

userInpEl.addEventListener("keyup", (e) => {
  let userInpValue = userInpEl.value;
  if (e.key == "Enter") {
    e.preventDefault();
    getRecipe(userInpValue);
  }
});

// getting dish using function
function getRecipe(userInpValue) {
  fetch(URL + userInpValue)
    .then((response) => response.json())
    .then((data) => {
      let myMeal = data.meals[0];
      let count = 1;
      let ingredients = [];

      for (let i in myMeal) {
        let ingredient = "";
        let measure = "";
        if (i.startsWith("strIngredient") && myMeal[i]) {
          ingredient = myMeal[i];
          measure = myMeal[`strMeasure${count}`];
          count += 1;
          ingredients.push(`${measure} ${ingredient}`);
        }
      }

      resultEl.innerHTML = `
  <img src=${myMeal.strMealThumb} />
 <div class="details">
 <h2>${myMeal.strMeal}</h2>
 <h4>${myMeal.strArea}</h4>
 </div>
  
  <div id="ingredients-content"></div>

  <div id= "recipe" >
  <button type="button" id="hide-recipe">X</button>
  <pre id="instructions">
   ${myMeal.strInstructions}
  </pre>
  </div>
  <button type="button" id="show-recipe">View Recipe</button>
  `;

      const ingredientContentEl = document.querySelector(
        "#ingredients-content"
      );
      const ingredientListEl = document.createElement("ul");
      const recipeEl = document.querySelector("#recipe");
      const hideRecipeEl = document.querySelector("#hide-recipe");
      const showRecipeEl = document.querySelector("#show-recipe");

      ingredients.forEach((ingredientItem) => {
        const ingredientListItemEl = document.createElement("li");
        ingredientListItemEl.innerText = ingredientItem;
        ingredientListEl.appendChild(ingredientListItemEl);

        ingredientContentEl.appendChild(ingredientListEl);
      });

      hideRecipeEl.addEventListener("click", () => {
        recipeEl.style.display = "none";
      });

      showRecipeEl.addEventListener("click", () => {
        recipeEl.style.display = "block";
      });
    })
    .catch(() => {
      resultEl.innerHTML = `<h3>Invalid Input</h3>`;
    });
}
