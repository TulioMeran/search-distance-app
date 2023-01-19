import ICity from '../types/city';
import ILocation from '../types/location';
import haversine from 'haversine-distance';

const data = [
  ['Paris', 48.856614, 2.352222],
  ['Marseille', 43.296482, 5.36978],
  ['Lyon', 45.764043, 4.835659],
  ['Toulouse', 43.604652, 1.444209],
  ['Nice', 43.710173, 7.261953],
  ['Nantes', 47.218371, -1.553621],
  ['Strasbourg', 48.573405, 7.752111],
  ['Montpellier', 43.610769, 3.876716],
  ['Bordeaux', 44.837789, -0.57918],
  ['Lille', 50.62925, 3.057256],
  ['Rennes', 48.117266, -1.677793],
  ['Reims', 49.258329, 4.031696],
  ['Le Havre', 49.49437, 0.107929],
  ['Saint-Étienne', 45.439695, 4.387178],
  ['Toulon', 43.124228, 5.928],
  ['Angers', 47.478419, -0.563166],
  ['Grenoble', 45.188529, 5.724524],
  ['Dijon', 47.322047, 5.04148],
  ['Nîmes', 43.836699, 4.360054],
  ['Aix-en-Provence', 43.529742, 5.447427],
];

const fakeApi = () => {
  const lista: ICity[] = [];

  const loadCities = () => {
    data.filter((item) => {
      lista.push({
        name: item[0] as string,
        latitude: item[1] as number,
        longitude: item[2] as number,
      });
    });
  };

  const getCitiesByName = (name: string): Promise<ICity[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        loadCities();
        resolve(lista.filter((c) => c.name.includes(name)));
      }, 2000);
    });
  };

  const calculateDistance = (
    origin: ILocation,
    destination: ILocation,
    cityOrigin: string,
    cityDestination: string
  ): Promise<Number> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (cityOrigin === 'Dijon' || cityDestination === 'Dijon') {
          reject('The calculate is not valid for the Dijon city');
        } else {
          const meters = haversine(origin, destination);
          resolve(meters / 1000);
        }
      }, 2000);
    });
  };

  return { getCitiesByName, calculateDistance };
};

export default fakeApi;
