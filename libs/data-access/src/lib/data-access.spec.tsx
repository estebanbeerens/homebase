import React from 'react';
import { render } from '@testing-library/react-native';
import DataAccess from './data-access';

describe('DataAccess', () => {
  it('should render successfully', () => {
    const { root } = render(<DataAccess />);
    expect(root).toBeTruthy();
  });
});
