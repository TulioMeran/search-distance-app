import { screen, render } from '@testing-library/react';
import HomeComponent from '../index';
import { BrowserRouter } from 'react-router-dom';

describe('Home component tests', () => {
  const renderComponent = () => {
    render(
      <BrowserRouter>
        <HomeComponent />
      </BrowserRouter>
    );
  };

  it('Should button disabled when page is load.', () => {
    renderComponent();
    expect(screen.getByText('Search')).toBeDisabled();
  });

  it('Should render fields.', () => {
    renderComponent();

    expect(screen.getAllByText('City of origin').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Intermediate cities').length).toBeGreaterThan(
      0
    );
    expect(screen.getAllByText('City of destination').length).toBeGreaterThan(
      0
    );
    expect(screen.getAllByText('Number of passengers').length).toBeGreaterThan(
      0
    );
  });
});
