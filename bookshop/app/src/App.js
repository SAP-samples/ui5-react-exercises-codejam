import { ThemeProvider } from '@ui5/webcomponents-react';
import './App.css';
import { Bookshop } from './components/Bookshop';

import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme';
import '@ui5/webcomponents/dist/Assets';
import '@ui5/webcomponents-fiori/dist/Assets';

function App() {
  setTheme('sap_horizon');
  return (
    <ThemeProvider>
      <Bookshop />
    </ThemeProvider>
  );
}

export default App;
