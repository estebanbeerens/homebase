import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from './ThemeProvider';

describe('ThemeProvider', () => {
  it('renders its children', () => {
    render(
      <ThemeProvider>
        <Text>Inside the theme</Text>
      </ThemeProvider>,
    );
    expect(screen.getByText('Inside the theme')).toBeTruthy();
  });
});
