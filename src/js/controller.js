import * as model from './model';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView';
import sarchView from './views/searchView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

if(module.hot) {
  module.hot.accept();
}

const controlSingleRecipe = async () => {
  try {
    const id = window.location.hash.substring(1);
    if (!id) return;

    recipeView.renderSpiner();

    await model.getSingleRecipe(id);
    const res = model.state.recipe;

    recipeView.render(res);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlAllRecipe = async () => {
  try {
    resultsView.renderSpiner();

    const query = sarchView.getQuery();
    if (!query) return;

    await model.getSearchRecipes(query);
    const res = model.state.search.results

    resultsView.render(res)
  } catch (err) {
    console.log(err);
  }
};

const init = () => {
  recipeView.addHandleRender(controlSingleRecipe);
  searchView.addHandlerSearch(controlAllRecipe);
};

init();
