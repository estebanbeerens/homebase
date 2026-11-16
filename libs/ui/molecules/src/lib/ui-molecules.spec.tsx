import React from 'react';
import { render } from '@testing-library/react-native';
import UiMolecules from './ui-molecules';

describe('UiMolecules', () => {
  it('should render successfully', () => {
    const { root } = render(<UiMolecules />);
    expect(root).toBeTruthy();
  });
});
