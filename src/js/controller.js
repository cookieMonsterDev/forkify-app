import * as model from './model';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView';
import sarchView from './views/searchView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';

if (module.hot) {
  module.hot.accept();
}

const controlSingleRecipe = async () => {
  try {
    const id = window.location.hash.substring(1);
    if (!id) return;

    recipeView.renderSpiner();

    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

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

const controlServings = newServings => {
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};

const constrolAddBookmarks = () => {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async newRecipe => {
  try {
    await model.upLoadRecipe(newRecipe);
    addRecipeView.toggleWindow();

    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err, 'test');
    addRecipeView.renderError(err);
  }
};

const init = () => {
  recipeView.addHandleRender(controlSingleRecipe);
  searchView.addHandlerSearch(controlAllRecipe);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandleUpdateServings(controlServings);
  recipeView.addHandleAddBookmar(constrolAddBookmarks);
  bookmarksView.addHandleRender(controlBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
