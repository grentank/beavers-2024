import React, { useCallback, useState } from 'react';
import IndexPage from './components/pages/IndexPage';
import {
  ToggleTranslateContext,
  TranslateContext,
} from './contexts/translate/context';

function App(): JSX.Element {
  const [ruTranslate, setRuTranslate] = useState(false);

  const toggleTranslation = useCallback(
    (): void => setRuTranslate((prev) => !prev),
    [],
  );

  return (
    <TranslateContext.Provider value={ruTranslate}>
      <ToggleTranslateContext.Provider value={toggleTranslation}>
        <div className="App">
          <IndexPage />
        </div>
      </ToggleTranslateContext.Provider>
    </TranslateContext.Provider>
  );
}

export default App;
