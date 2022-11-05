import { KEY } from '../helpers/config';
import { ForkifyRoots } from '../helpers/PathRoots';
import {
  DefaultRecipeTypes,
  SearchRecipeListTypes,
  SearchRecipeTypes,
} from '../helpers/types';

interface useFetchProps {
  id?: string;
  query?: string;
  body?: any;
}

const getData = async ({
  id,
  query,
  body,
}: useFetchProps): Promise<SearchRecipeTypes | SearchRecipeListTypes[] | undefined> => {
  try {
    if (id) {
      const res = await ForkifyRoots.get(id);
      const data = res.data.data.recipe;
      return {
        id: data.id,
        title: data.title,
        publisher: data.publisher,
        sourceUrl: data.source_url,
        image: data.image_url,
        servings: data.servings,
        cookingTime: data.cooking_time,
        ingredients: data.ingredients,
      };
    }

    if (query) {
      const res = await ForkifyRoots.get(`?search=${query}`);
      const data = res.data.data.recipes;
      return data.map((i: DefaultRecipeTypes) => {
        return {
          id: i.id,
          title: i.title,
          publisher: i.publisher,
          image: i.image_url,
        };
      });
    }

    if (body) {
      const res = await ForkifyRoots.post(`?key=${KEY}`, { ...body });
      const data = res.data.data.recipe;
      return {
        id: data.id,
        title: data.title,
        publisher: data.publisher,
        sourceUrl: data.source_url,
        image: data.image_url,
        servings: data.servings,
        cookingTime: data.cooking_time,
        ingredients: data.ingredients,
      };
    }

    return; 
  } catch (err) {
    console.log(err)
  }
};

export default getData;
