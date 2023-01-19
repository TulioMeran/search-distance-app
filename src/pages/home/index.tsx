import { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Grid, TextField } from '@mui/material';
import ICity from '../../types/city';
import { SubmitHandler, useForm } from 'react-hook-form';
import ISearchFormValue from '../../types/form/IFormValues';
import { fieldRequiredErrorMessage } from '../../utils/Helpers';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import fakeApi from '../../api';

const HomePage = () => {
  let navigate = useNavigate();
  let api = fakeApi();

  const [citiesOrigin, setCitiesOrigin] = useState<ICity[]>([]);
  const [citiesIntermediate, setCitiesIntermediate] = useState<ICity[]>([]);
  const [citiesDestination, setCitiesDestination] = useState<ICity[]>([]);
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
  }, [register]);

  useEffect(() => {
    api
      .getCitiesByName('')
      .then((response) => {
        setCitiesIntermediate(response);
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      debugger;
      const params = window.location.search.split('&');
      if (params) {
        params.filter((p) => {
          if (p.includes('cityOfOrigin')) {
            debugger;
            const value = p.split('=')[1];
            setValue('cityOfOrigin', value);
          } else if (p.includes('numberOfPassengers')) {
            const value = p.split('=')[1];
            setValue('numberOfPassengers', Number(value));
          }
        });
      }
    }, 2000);
  }, []);

  const handlerSearch: SubmitHandler<ISearchFormValue> = (
    data: ISearchFormValue
  ) => {
    alert(JSON.stringify(data));
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
      /*
      window.location.search = `?cityOfOrigin=${getValues(
        'cityOfOrigin'
      )}&intermediateCities=${getValues('intermediateCities')
        .map((a) => a.name)
        .join('_')}&cityOfDestination=${getValues(
        'cityOfDestination'
      )}&dateOfTheTrip=${format(
        new Date(getValues('dateOfTheTrip')),
        'yyyy-MM-dd'
      )}&numberOfPassengers=${getValues('numberOfPassengers')}`;
      */
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

  return (
    <Box component={'div'}>
      <Grid container sx={{ padding: 5 }} rowGap={2}>
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            loading={citiesOrigin.length > 0}
            options={citiesOrigin}
            inputValue={getValues('cityOfOrigin')}
            getOptionLabel={(option) => option.name}
            value={
              citiesOrigin.filter(
                (c) => c.name === getValues('cityOfOrigin')
              )[0]
            }
            renderInput={(params) => (
              <TextField
                {...register('cityOfOrigin', {
                  required: fieldRequiredErrorMessage('City of origin'),
                })}
                error={errors.cityOfOrigin?.message !== undefined}
                {...params}
                label="City of origin"
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
          <TextField
            fullWidth
            error={errors.dateOfTheTrip?.message !== undefined}
            type={'date'}
            {...register('dateOfTheTrip', {
              required: fieldRequiredErrorMessage('date Of The Trip'),
              valueAsDate: true,
              onChange(event) {
                debugger;
                setValue('dateOfTheTrip', event.target.value);
              },
            })}
          />
          {errors.dateOfTheTrip?.message !== undefined && (
            <h1 style={{ color: 'red', fontSize: 15 }}>
              {errors.dateOfTheTrip?.message}
            </h1>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
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
