import * as model from './model';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

///////////////////////////////////////

const renderRecipe = async () => {
  const id = window.location.hash.substring(1);
  if (!id) return;

  recipeView.renderSpiner();

  // 1. loading recipe
  await model.getSingleRecipe(id);
  const res = model.state.recipe;

  // 2. Rendering recipe
  recipeView.render(res);
};

['hashchange', 'load'].forEach(el => window.addEventListener(el, renderRecipe));
