import { appRequests } from './resquestsRoots';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
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
