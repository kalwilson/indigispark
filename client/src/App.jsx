import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { DefaultLayout } from './components';

function App() {
  return (
    <>
      <DefaultLayout>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </DefaultLayout>
    </>
  );
}

export default App;
