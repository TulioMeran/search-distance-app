import { screen, render } from '@testing-library/react';
import ResultItem from '../index';

describe('Result component tests', () => {
  const renderComponent = () => {
    render(<ResultItem label="City of Origin" value="Paris" />);
  };

  it('Label should render in the component', () => {
    renderComponent();
    expect(screen.getByText('City of Origin')).toBeInTheDocument();
  });

  it('Value should render in the component', () => {
    renderComponent();
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });
});
