import * as model from './model';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView';

const controlRecipe = async () => {
  try {
    const id = window.location.hash.substring(1);
    if (!id) return;

    recipeView.renderSpiner();

    // 1. loading recipe
    await model.getSingleRecipe(id);
    const res = model.state.recipe;

    // 2. Rendering recipe
    recipeView.render(res);
  } catch (err) {
    // 3. Render Error
    recipeView.renderError();
  }
};

const init = () => {
  recipeView.addHandleRender(controlRecipe);
};

init();
