import React from 'react';
import { render } from '@testing-library/react-native';
import FeatureInventory from './feature-inventory';

describe('FeatureInventory', () => {
  it('should render successfully', () => {
    const { root } = render(<FeatureInventory />);
    expect(root).toBeTruthy();
  });
});
