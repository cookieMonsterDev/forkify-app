import { appRequests } from './resquestsRoots';

export const state = {
  recipe: {},
};

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
    console.log(err) 
    throw new Error(`${err.response.data.message}`);
  }
};
