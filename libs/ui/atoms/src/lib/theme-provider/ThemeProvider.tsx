import type { ReactNode } from 'react';
import { GluestackUIProvider } from '../../gluestack/gluestack-ui-provider';

export interface ThemeProviderProps {
  children?: ReactNode;
}

/**
 * Root provider for the Homebase UI. Wraps Gluestack's provider so that
 * apps and features never import Gluestack directly. Homebase is
 * light-only for now.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return <GluestackUIProvider mode="light">{children}</GluestackUIProvider>;
}
