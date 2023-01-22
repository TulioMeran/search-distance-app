import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ILocation from '../../types/location';
import fakeApi from '../../api';
import ResultItem from '../../components/resultItem';

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
      api.getCitiesByName(params.cityOfOrigin!),
      api.getCitiesByName(params.cityOfDestination!),
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
            <ResultItem
              testid="cityOfOrigin"
              label="City of Origin"
              value={params.cityOfOrigin!}
            />
            <ResultItem
              testid="intermediateCities"
              label="Intermediate cities"
              value={params.intermediateCities?.split('_').join(' , ')!}
            />
            <ResultItem
              testid="cityOfDestination"
              label="City Of Destination"
              value={params.cityOfDestination!}
            />
            <ResultItem
              testid="dateOfTheTrip"
              label="Date of the trip"
              value={params.dateOfTheTrip!}
            />
            <ResultItem
              testid="numberOfPassengers"
              label="Number of passengers"
              value={params.numberOfPassengers!}
            />
            <ResultItem
              testid="kilometers"
              label="Kilometers"
              value={kilometers.toString()}
            />
          </Box>
        ) : (
          <h1 data-testid="errorMessage">{errorObject.errorMessage}</h1>
        )
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default ResultPage;
