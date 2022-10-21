import axios from 'axios';

const appRequests = axios.create({
  baseURL: 'https://forkify-api.herokuapp.com/api/v2/recipes',
});

export const getSingleRecipe = async id => {
  try {
    const res = await appRequests.get(id);
    const body = res.data.data.recipe;

    return {
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
    throw new Error(`Something went worng!`);
  }
};
