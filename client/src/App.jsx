import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { routes } from './routes';
import {
  HomePage,
  PromptStep,
  NameStep,
  AestheticStep,
  SummaryPage,
} from './pages/index.js';

function App() {
  return (
    <>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
