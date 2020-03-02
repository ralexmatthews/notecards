import React, { useContext, useState } from "react";

const NavigationContext = React.createContext<
  [any, React.Dispatch<React.SetStateAction<any>>]
>([{}, () => {}]);

export const NavigationValuesContextProvider = (props: any) => {
  const [navValues, setNavValues] = useState({});

  return (
    <NavigationContext.Provider {...props} value={[navValues, setNavValues]} />
  );
};

export const useNavigationValue: <A>(id: string) => [A, (value: A) => void] = (
  id: string
) => {
  const [values, setValues] = useContext(NavigationContext);

  return [
    values[id],
    (value: any) => setValues((values: any) => ({ ...values, id: value }))
  ];
};

export const useCreateNavigationValue = () => {
  const [, setValues] = useContext(NavigationContext);

  return (value: any) => {
    const id =
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9);
    setValues(values => ({
      ...values,
      [id]: value
    }));
    return id;
  };
};
