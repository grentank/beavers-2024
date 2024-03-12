import { createContext } from 'react';
import type { ToggleTranslateType } from '../../types/translate';

export const TranslateContext = createContext<boolean>(false);

export const ToggleTranslateContext = createContext<ToggleTranslateType | null>(
  null,
);
