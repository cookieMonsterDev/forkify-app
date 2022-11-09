import React, { useState, createContext, useContext } from 'react';

interface Props {
  children: React.ReactNode;
}

interface Loader {
  loadingSearch: boolean;
  loadingRecipe: boolean;
}

export const useErrorHandlingContext = () => useContext(Context);
export const useUpdateErrorHandlingContext = () => useContext(UpdateContext);

const Context = createContext<Loader>({
  loadingSearch: false,
  loadingRecipe: false,
});
const UpdateContext = createContext<
  React.Dispatch<React.SetStateAction<Loader>>
>(null!);

export const ErrorHandlingContext = ({ children }: Props) => {
  const [state, setState] = useState<Loader>({
    loadingSearch: false,
    loadingRecipe: false,
  });

  return (
    <Context.Provider value={state}>
      <UpdateContext.Provider value={setState}>
        {children}
      </UpdateContext.Provider>
    </Context.Provider>
  );
};
