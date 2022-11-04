import React, { useState, createContext, useContext } from 'react';
import { RecipeTypes } from '../types';

interface Props {
  children: React.ReactNode
}

export const useRecipe = () => useContext(RecipeContext);
export const useUpdateRecipe = () => useContext(UpdateRecipeContext);

const RecipeContext = createContext<RecipeTypes | null>(null);
const UpdateRecipeContext = createContext<
  React.Dispatch<React.SetStateAction<RecipeTypes | null>>
>(null!);

export const AppContext = ({ children }: Props) => {
  const [recipe, setRecipe] = useState<RecipeTypes | null>(null);

  return (
    <RecipeContext.Provider value={recipe}>
      <UpdateRecipeContext.Provider value={setRecipe}>
        {children}
      </UpdateRecipeContext.Provider>
    </RecipeContext.Provider>
  );
};
