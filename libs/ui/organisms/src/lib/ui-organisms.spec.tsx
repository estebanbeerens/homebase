import React from 'react';
import { render } from '@testing-library/react-native';
import UiOrganisms from './ui-organisms';

describe('UiOrganisms', () => {
  it('should render successfully', () => {
    const { root } = render(<UiOrganisms />);
    expect(root).toBeTruthy();
  });
});
