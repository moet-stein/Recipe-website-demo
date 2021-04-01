const myKey = config.MY_KEY;

// fetch(
//   'https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&intolerances=gluten&sort=random&apiKey=' + myKey
// )
//   .then((res) => res.json())
//   .then((data) => console.log(data.results))
//   .catch((e) => console.log('OH NO ERROR', e));

//*****RECIPES OPTION1*****//
// Get recipes without axios, but with async await func
const fetchRecipes = async () => {
  try {
    const res = await fetch(
      'https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&intolerances=gluten&sort=random&apiKey=' +
        myKey
    );
    const data = await res.json();
    console.log(data.results);
  } catch (e) {
    console.log('SOMETHING WENT WRONG');
  }
};

///////////////////////////////////////////////// AXIOS (don't forget embading url from axios in html header)/////////////////////////////////
// axios
//   .get(
//     'https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&intolerances=gluten&sort=random&apiKey=' + myKey
//   )
//   .then((res) => console.log(res.data.results))
//   .catch((e) => console.log('ERROR', e));

//********************** *********************************************************************************************************************************************************************************/

// *****DOM WITH RECIPES OPTION2*****//
// WHEN HITTING BUTTON, SHOW MORE RECIPES (10 by EACH BUTTON)
const button = document.getElementById('newRecipes');
const recipesUL = document.getElementById('recipes');
const imagesDiv = document.getElementById('images');

const addNewRecipes = async () => {
  const recipes = await fetchRecipes2();
  for (let i = 0; i < recipes.length; i++) {
    // CREATING THIS HTML AT EACH LOOP
    //
    // <div class="imageDiv">
    //  <a class="a-for-image">
    //    <img src="recipes[i].image"          id="recipeImg">
    //  </a>
    //  <a class="a-for-title">
    //    <h2 class="recipe-title">TITLE</h2>
    //  </a>
    //  <button id="addBtn" class="add-Btn"></button>
    //  </div>;
    console.log(recipes);

    // CREATING DIV INSIDE IMAGES DIV
    const imgDiv = document.createElement('div');
    imgDiv.setAttribute('class', 'image-Div');
    imagesDiv.appendChild(imgDiv);

    // ADDING A tag for the image
    const aTag = document.createElement('a');
    aTag.setAttribute('href', recipes[i].sourceUrl);
    aTag.setAttribute('class', 'a-for-image');
    aTag.setAttribute('target', '_blank');
    imgDiv.appendChild(aTag);

    // ADDING IMAGE in A tag
    const img = document.createElement('img');
    img.setAttribute('src', recipes[i].image);
    img.setAttribute('id', 'recipeImg');
    aTag.appendChild(img);

    // ADDING A tag for the title
    const titleATag = document.createElement('a');
    titleATag.setAttribute('href', recipes[i].sourceUrl);
    titleATag.setAttribute('class', 'a-for-title');
    titleATag.setAttribute('target', '_blank');
    imgDiv.appendChild(titleATag);

    // ADDING TITLE in A tag
    const title = document.createElement('h2');
    title.setAttribute('class', 'recipe-title');
    title.innerText = recipes[i].title;
    titleATag.appendChild(title);

    // ADDING BUTTON
    const addBtn = document.createElement('button');
    addBtn.setAttribute('id', 'addBtn');
    addBtn.setAttribute('class', 'add-Btn');
    addBtn.innerText = 'ADD TO LIST';
    imgDiv.appendChild(addBtn);
  }
};
// CLICKING THE BUTTON AND CALLING THE FUNC ABOVE(addNewRecipes)
button.addEventListener('click', addNewRecipes);

//*****RECIPES OPTION2*****//
// Get an array of recipes with axios(and with async await func)
// This data includes ID that can be used to request the data of ingredients as below
const fetchRecipes2 = async () => {
  try {
    const res = await axios.get(
      'https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&intolerances=gluten&sort=random&apiKey=' +
        myKey
    );
    return res.data.results;
  } catch (e) {
    console.log(e);
  }
};

//********************** *********************************************************************************************************************************************************************************/

// *****INGREDIENTS OPTION1****//
// Get ingredients names with axios
const getIngredients = async () => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const res = await axios.get(
      'https://api.spoonacular.com/recipes/716429/information?includeNutrition=false&apiKey=' +
        myKey,
      config
    );
    console.log(res.data.extendedIngredients.map((x) => x.name));
  } catch (e) {
    console.log('ERROR', e);
  }
};

// *****INGREDIENTS OPTION2*****//
// Get ingredients names without axios
const getIngredients2 = async () => {
  try {
    const res = await axios.get(
      'https://api.spoonacular.com/recipes/716437/information?includeNutrition=false&apiKey=' +
        myKey
    );
    console.log(res.data.extendedIngredients.map((x) => x.name));
  } catch (e) {
    console.log(e);
  }
};
