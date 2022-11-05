import React, { useState, createContext, useContext } from 'react';

interface Props {
  children: React.ReactNode;
}

export const useErrorHandlingContext = () => useContext(Context);
export const useUpdateErrorHandlingContext = () => useContext(UpdateContext);

const Context = createContext<boolean | null>(null);
const UpdateContext = createContext<React.Dispatch<React.SetStateAction<boolean>>>(null!);

export const ErrorHandlingContext = ({ children }: Props) => {
  const [state, setState] = useState(false);

  return (
    <Context.Provider value={state}>
      <UpdateContext.Provider value={setState}>
        {children}
      </UpdateContext.Provider>
    </Context.Provider>
  );
};
