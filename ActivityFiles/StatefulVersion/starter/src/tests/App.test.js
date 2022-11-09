import { render } from '@testing-library/react';
import App from '../App';

describe('App snapshot test', () => {
  test('App component renders', () => {
    const appComponent = render(<App />);
    expect(appComponent).toBeTruthy();
  });
});
