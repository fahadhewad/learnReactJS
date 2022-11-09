import { render } from '@testing-library/react';
import App from '../App';

describe('App render test', () => {
  test('App component renders correctly', () => {
    const appComponent = render(<App />);
    expect(appComponent).toBeTruthy();
  });
});
