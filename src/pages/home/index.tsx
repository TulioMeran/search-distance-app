import { useEffect, useState, useContext } from 'react';
import { Autocomplete, Box, Button, Grid, TextField } from '@mui/material';
import ICity from '../../types/city';
import { SubmitHandler, useForm } from 'react-hook-form';
import ISearchFormValue from '../../types/form/IFormValues';
import { fieldRequiredErrorMessage } from '../../utils/Helpers';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import fakeApi from '../../api';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AdapterDateFns from '@date-io/date-fns';

const HomePage = () => {
  let navigate = useNavigate();
  let api = fakeApi();

  const [citiesOrigin, setCitiesOrigin] = useState<ICity[]>([]);
  const [citiesIntermediate, setCitiesIntermediate] = useState<ICity[]>([]);
  const [citiesDestination, setCitiesDestination] = useState<ICity[]>([]);
  const [dateTrip, setDateTrip] = useState<string | null>(null);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<ISearchFormValue>({ mode: 'all' });

  useEffect(() => {
    register('intermediateCities', {
      required: fieldRequiredErrorMessage('Intermediate cities'),
    });
    register('dateOfTheTrip', {
      required: fieldRequiredErrorMessage('date Of The Trip'),
    });
  }, [register]);

  useEffect(() => {
    api
      .getCitiesByName('')
      .then((response) => {
        setCitiesIntermediate(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlerSearch: SubmitHandler<ISearchFormValue> = (
    data: ISearchFormValue
  ) => {
    navigate(
      `/results/${data.cityOfOrigin}/${data.intermediateCities
        .map((city) => city.name)
        .join('_')}/${data.cityOfDestination}/${format(
        new Date(data.dateOfTheTrip),
        'yyyy-MM-dd'
      )}/${data.numberOfPassengers}`
    );
  };

  useEffect(() => {
    if (isValid) {
      navigate(
        `/${getValues('cityOfOrigin')}/${getValues('intermediateCities')
          .map((a) => a.name)
          .join('_')}/${getValues('cityOfDestination')}/${format(
          new Date(getValues('dateOfTheTrip')),
          'yyyy-MM-dd'
        )}/${getValues('numberOfPassengers')}`
      );
    }
  }, [isValid]);

  useEffect(() => {
    api
      .getCitiesByName(getValues('cityOfOrigin'))
      .then((response) => {
        setCitiesOrigin((prev) => (prev = response));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getValues('cityOfOrigin')]);

  useEffect(() => {
    api
      .getCitiesByName(getValues('cityOfDestination'))
      .then((response) => {
        setCitiesDestination((prev) => (prev = response));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getValues('cityOfDestination')]);

  useEffect(() => {
    setValue('dateOfTheTrip', dateTrip!);
  }, [dateTrip]);

  return (
    <Box component={'div'}>
      <Grid container sx={{ padding: 5 }} rowGap={2}>
        <Grid item xs={12}>
          <Autocomplete
            data-testid="cityOfOrigin"
            disablePortal
            loading={citiesOrigin.length > 0}
            options={citiesOrigin}
            getOptionLabel={(option) => option.name}
            renderInput={(paramsInput) => (
              <TextField
                error={errors.cityOfOrigin?.message !== undefined}
                {...paramsInput}
                label="City of origin"
                {...register('cityOfOrigin', {
                  required: fieldRequiredErrorMessage('City of origin'),
                })}
              />
            )}
          />
          {errors.cityOfOrigin?.message !== undefined && (
            <h1 style={{ color: 'red', fontSize: 15 }}>
              {errors.cityOfOrigin?.message}
            </h1>
          )}
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            data-testid="intermediateCities"
            multiple
            disablePortal
            options={citiesIntermediate}
            getOptionLabel={(option) => option.name}
            onChange={(event, options) =>
              setValue('intermediateCities', options)
            }
            renderInput={(params) => (
              <TextField
                error={errors.intermediateCities?.message !== undefined}
                {...params}
                label="Intermediate cities"
              />
            )}
          />
          {errors.intermediateCities?.message !== undefined && (
            <h1 style={{ color: 'red', fontSize: 15 }}>
              {errors.intermediateCities?.message}
            </h1>
          )}
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            data-testid="cityOfDestination"
            disablePortal
            options={citiesDestination}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="City of destination"
                error={errors.cityOfDestination?.message !== undefined}
                {...register('cityOfDestination', {
                  required: fieldRequiredErrorMessage('City of destination'),
                })}
              />
            )}
          />
          {errors.cityOfDestination?.message !== undefined && (
            <h1 style={{ color: 'red', fontSize: 15 }}>
              {errors.cityOfDestination?.message}
            </h1>
          )}
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date Of The Trip"
              inputFormat="yyyy-MM-dd"
              data-testid="dateOfTheTrip"
              value={dateTrip}
              minDate={Date.now()}
              onChange={(event) => {
                setDateTrip(event!.toString());
              }}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>
          {errors.dateOfTheTrip?.message !== undefined && (
            <h1 style={{ color: 'red', fontSize: 15 }}>
              {errors.dateOfTheTrip?.message}
            </h1>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            data-testid="numberOfPassengers"
            error={errors.numberOfPassengers?.message !== undefined}
            fullWidth
            type={'number'}
            label="Number of passengers"
            {...register('numberOfPassengers', {
              valueAsNumber: true,
              required: fieldRequiredErrorMessage('Number of passengers'),
              min: { value: 1, message: 'The minimun value is 0' },
            })}
          />
          {errors.numberOfPassengers?.message !== undefined && (
            <h1 style={{ color: 'red', fontSize: 15 }}>
              {errors.numberOfPassengers.message}
            </h1>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={!isValid}
            sx={{ fontWeight: 'bold' }}
            fullWidth
            variant="contained"
            onClick={handleSubmit(handlerSearch)}>
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
