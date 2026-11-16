import React from 'react';
import { render } from '@testing-library/react-native';
import FeatureDashboard from './feature-dashboard';

describe('FeatureDashboard', () => {
  it('should render successfully', () => {
    const { root } = render(<FeatureDashboard />);
    expect(root).toBeTruthy();
  });
});
