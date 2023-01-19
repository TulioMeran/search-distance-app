import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ILocation from '../../types/location';
import fakeApi from '../../api';

const ResultPage = () => {
  let params = useParams();
  let api = fakeApi();
  const [kilometers, setKilometers] = useState<Number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorObject, setErrorObject] = useState({
    hasError: false,
    errorMessage: '',
  });

  useEffect(() => {
    Promise.all([
      api.getCitiesByName(params.cityOfOrigin as string),
      api.getCitiesByName(params.cityOfDestination as string),
    ])
      .then((values) => {
        const origin = values[0][0];
        const destination = values[1][0];
        const locationOrigin: ILocation = {
          latitude: origin.latitude,
          longitude: origin.longitude,
        };

        const locationDestination: ILocation = {
          latitude: destination.latitude,
          longitude: destination.longitude,
        };

        api
          .calculateDistance(
            locationOrigin,
            locationDestination,
            origin.name,
            destination.name
          )
          .then((response) => {
            setKilometers(response);
          })
          .catch((err) => {
            setErrorObject({
              hasError: true,
              errorMessage: err,
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      }}>
      {!isLoading ? (
        !errorObject.hasError ? (
          <Box component={'div'}>
            <h1>City of Origin: {params.cityOfOrigin}</h1>
            <h1>
              Intermediate cities:{' '}
              {params.intermediateCities?.split('_').join(' , ')}
            </h1>
            <h1>City Of Destination: {params.cityOfDestination}</h1>
            <h1>Date of the trip: {params.dateOfTheTrip}</h1>
            <h1>Number of passengers: {params.numberOfPassengers}</h1>
            <h1>Kilometers: {kilometers.toString()}</h1>
          </Box>
        ) : (
          <h1>{errorObject.errorMessage}</h1>
        )
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default ResultPage;
