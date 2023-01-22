import { fieldRequiredErrorMessage } from '../Helpers';

describe('Helpers tests', () => {
  it('Test the fieldRequiredErrorMessage function', () => {
    const message = fieldRequiredErrorMessage('City of Origin');
    expect(message).toBe('The City of Origin field is required.');
  });
});
