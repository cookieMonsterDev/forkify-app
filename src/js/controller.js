import * as model from './model';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView';
import sarchView from './views/searchView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

if (module.hot) {
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

    resultsView.render(model.getSearchResultsPage(1));

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = goToPage => {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = (newServings) => {
  model.updateServings(newServings); 

  recipeView.render(model.state.recipe)
}

const init = () => {
  recipeView.addHandleRender(controlSingleRecipe);
  searchView.addHandlerSearch(controlAllRecipe);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandleUpdateServings(controlServings);
};

init();
