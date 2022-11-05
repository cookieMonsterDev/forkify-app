export interface AppContextTypes {
  recipe?: SearchRecipeTypes;
  searchResults?: SearchRecipeListTypes[];
  bookmarks?: any[];
}

export interface DefaultRecipeTypes {
  id: string;
  title: string;
  publisher: string;
  source_url: string;
  image_url: string;
  servings: number;
  cooking_time: number;
  ingredients: string[];
}

export interface SearchRecipeTypes {
  id: string;
  title: string;
  publisher: string;
  sourceUrl: string;
  image: string;
  servings: number;
  cookingTime: number;
  ingredients: string[];
}

export interface SearchRecipeListTypes {
  id: string;
  title: string;
  publisher: string;
  image: string;
}
