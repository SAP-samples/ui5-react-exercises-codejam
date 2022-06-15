import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

import '@ui5/webcomponents/dist/Assets';
import '@ui5/webcomponents-fiori/dist/Assets';
import '@ui5/webcomponents-react/dist/Assets';

import { registerI18nLoader } from '@ui5/webcomponents-base/dist/asset-registries/i18n.js';
import parse from '@ui5/webcomponents-base/dist/PropertiesFileFormat.js';

const supportedLocales = ['en', 'de'];
supportedLocales.forEach((localeToRegister) => {
  registerI18nLoader('myApp', localeToRegister, async (localeId) => {
    const props = await (
      await fetch(`./src/i18n/i18n_${localeId}.properties`)
    ).text();
    return parse(props);
  });
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
