import { isDate } from 'cypress/types/lodash';
import SearchDistancePage from '../PageObjects/searchDistancePage';

describe('Search Distance E2E tests', () => {
  const searchDistance = new SearchDistancePage();

  it('Search button is dissabled when fields are not fill', () => {
    searchDistance.visit('');
    searchDistance.click('[data-testid=cityOfOrigin]');
    searchDistance.click('[data-option-index=0]');
    searchDistance.click('[data-testid=cityOfDestination]');
    searchDistance.click('[data-option-index=1]');
    searchDistance.type('[data-testid=numberOfPassengers]', '4');
    searchDistance.checkStatusOfSearch(true);
  });

  it('Search button is not dissabled when fields are fill', () => {
    searchDistance.visit('');
    searchDistance.click('[data-testid=cityOfOrigin]');
    searchDistance.click('[data-option-index=0]');
    searchDistance.click('[data-testid=intermediateCities]');
    searchDistance.click('[data-option-index=0]');
    searchDistance.click('[data-testid=cityOfDestination]');
    searchDistance.click('[data-option-index=1]');
    searchDistance.type('[name=dateOfTheTrip]', '1995-07-04');
    searchDistance.type('[data-testid=numberOfPassengers]', '4');
    searchDistance.checkStatusOfSearch(false);
  });

  it('Should display message when city of destination is Dijon', () => {
    searchDistance.visit('results/Paris/Paris_Toulouse/Dijon/2023-01-19/34');
    searchDistance.checkElementIsVisible('[data-testid=errorMessage]');
  });

  it('Should display message when city of origin is Dijon', () => {
    searchDistance.visit('results/Dijon/Paris_Toulouse/Paris/2023-01-19/34');
    searchDistance.checkElementIsVisible('[data-testid=errorMessage]');
  });

  it('Should display all the fields in Result page', () => {
    searchDistance.visit(
      'results/Marseille/Paris_Toulouse/Paris/2023-01-19/34'
    );
    searchDistance.checkElementIsVisible('[data-testid=cityOfOrigin]');
    searchDistance.checkElementIsVisible('[data-testid=intermediateCities]');
    searchDistance.checkElementIsVisible('[data-testid=cityOfDestination]');
    searchDistance.checkElementIsVisible('[data-testid=dateOfTheTrip]');
    searchDistance.checkElementIsVisible('[data-testid=numberOfPassengers]');
    searchDistance.checkElementIsVisible('[data-testid=kilometers]');
  });
});
