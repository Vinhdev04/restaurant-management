import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loading from '@components/shared/Loading/Loading.jsx';
import routes from '@routes/index.route.jsx';
import '@styles/css/app.module.scss';

const router = createBrowserRouter(routes);

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
