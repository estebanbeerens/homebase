import React from 'react';
import { render } from '@testing-library/react-native';
import FeatureRooms from './feature-rooms';

describe('FeatureRooms', () => {
  it('should render successfully', () => {
    const { root } = render(<FeatureRooms />);
    expect(root).toBeTruthy();
  });
});
