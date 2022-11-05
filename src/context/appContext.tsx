import React, { useState, createContext, useContext } from 'react';
import { AppContextTypes } from '../helpers/types';

interface Props {
  children: React.ReactNode;
}

export const useRecipe = () => useContext(RecipeContext);
export const useUpdateRecipe = () => useContext(UpdateRecipeContext);

const RecipeContext = createContext<AppContextTypes | null>(null);
const UpdateRecipeContext = createContext<
  React.Dispatch<React.SetStateAction<AppContextTypes | null>>
>(null!);

export const AppContext = ({ children }: Props) => {
  const [recipe, setRecipe] = useState<AppContextTypes | null>(null);

  return (
    <RecipeContext.Provider value={recipe}>
      <UpdateRecipeContext.Provider value={setRecipe}>
        {children}
      </UpdateRecipeContext.Provider>
    </RecipeContext.Provider>
  );
};
