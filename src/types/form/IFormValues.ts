import { NestedValue } from 'react-hook-form';
import ICity from '../city';

interface ISearchFormValue {
  cityOfOrigin: string;
  intermediateCities: ICity[];
  cityOfDestination: string;
  dateOfTheTrip: string;
  numberOfPassengers: number;
}

export default ISearchFormValue;
