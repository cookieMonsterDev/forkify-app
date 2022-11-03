import { RES_PRE_PAGE } from './config';
import { appRequests } from './resquestsRoots';
import { KEY } from './config';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PRE_PAGE,
  },
  bookmarks: [],
};

const transformData = data => {
  return {
    id: data.id,
    title: data.title,
    publisher: data.publisher,
    sourceUrl: data.source_url,
    image: data.image_url,
    servings: data.servings,
    cookingTime: data.cooking_time,
    ingredients: data.ingredients,
    ...(data.key && { key: data.key }),
  };
};

// Get single recipe by id
export const getSingleRecipe = async id => {
  try {
    const res = await appRequests.get(id);
    const body = res.data.data.recipe;

    state.recipe = {
      id: body.id,
      title: body.title,
      publisher: body.publisher,
      sourceUrl: body.source_url,
      image: body.image_url,
      servings: body.servings,
      cookingTime: body.cooking_time,
      ingredients: body.ingredients,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmark = true;
    } else state.recipe.bookmark = false;
  } catch (err) {
    throw new Error(`${err.response.data.message}`);
  }
};

//Get all recipes by query
export const getSearchRecipes = async query => {
  try {
    state.search.query = query;
    const res = await appRequests.get(`?search=${query}`);
    const body = res.data.data.recipes;

    state.search.results = body.map(item => {
      return {
        id: item.id,
        title: item.title,
        publisher: item.publisher,
        image: item.image_url,
      };
    });
  } catch (err) {
    throw new Error(`${err.response.data.message}`);
  }
};

//Get pagination page
export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

//Update servings
export const updateServings = newServings => {
  state.recipe.ingredients.forEach(el => {
    el.quantity = (el.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = recipe => {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }

  persistBookmarks();
};

export const deleteBookmark = id => {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }

  persistBookmarks();
};

const init = () => {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

export const upLoadRecipe = async newRecipe => {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(i => i[0].startsWith('ingredient') && i[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3) throw new Error('Wrong ingredient format :)');

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      ingredients,
    };

    const data = await sendRecipe(recipe);
    state.recipe = transformData(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

const sendRecipe = async body => {
  try {
    const res = await appRequests.post(`?key=${KEY}`, { ...body });
    const info = res.data.data.recipe;

    return info;
  } catch (err) {
    throw new Error(`${err.response.data.message}`);
  }
};
