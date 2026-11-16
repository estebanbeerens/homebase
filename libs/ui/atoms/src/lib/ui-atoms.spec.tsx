import React from 'react';
import { render } from '@testing-library/react-native';
import UiAtoms from './ui-atoms';

describe('UiAtoms', () => {
  it('should render successfully', () => {
    const { root } = render(<UiAtoms />);
    expect(root).toBeTruthy();
  });
});
