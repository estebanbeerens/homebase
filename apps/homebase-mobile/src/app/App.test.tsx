import { render, screen } from '@testing-library/react-native';

import App from './App';

test('renders the app shell', () => {
  render(<App />);
  expect(screen.getByTestId('heading')).toHaveTextContent('Homebase');
});
