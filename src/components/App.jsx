import { Route, Routes } from 'react-router-dom';

import { Favorite } from 'pages/Favorite/Favorite';
import { Catalog } from 'pages/Catalog/Catalog';
import { Welcome } from 'pages/Welcome/Welcome';
import { Layout } from './Layout/Layout';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/favorite" element={<Favorite />} />
      </Route>
      <Route path="*" element={<Welcome />} />
    </Routes>
  );
};
