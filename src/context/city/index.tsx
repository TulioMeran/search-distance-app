import { createContext, FC, useState, useEffect } from 'react';
import ICity from '../../types/city';
import fakeApi from '../../api';

export const cityContext = createContext<{ cities: ICity[] }>({ cities: [] });

const CityContextProvider: FC<{ children: any }> = ({ children }) => {
  let api = fakeApi();
  const [cities, setCities] = useState<ICity[]>([]);

  useEffect(() => {
    api
      .getCitiesByName('')
      .then((response) => {
        setCities(response);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <cityContext.Provider value={{ cities }}>{children}</cityContext.Provider>
  );
};

export default CityContextProvider;
