import { useContext } from 'react';
import { ToggleTranslateContext } from './context';
import type { ToggleTranslateType } from '../../types/translate';

export default function useToggleTranslate(): ToggleTranslateType {
  const context = useContext(ToggleTranslateContext);
  if (!context)
    throw new Error(
      'useToggleTranslate must be used within a context provider',
    );
  return context;
}
