import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './Components/screens/HomeScreen.jsx';
import ErrorBoundary from './Components/ErrorBoundary.jsx';
import LoginScreen from './Components/screens/LoginScreen.jsx';
import RegisterScreen from './Components/screens/RegisterScreen.jsx';
import  store  from './store';
import { Provider } from 'react-redux';
import ProfileScreen from './Components/screens/ProfileScreen.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<ErrorBoundary />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
     <Route path='/register' element={<RegisterScreen />} />
     <Route path='' element={<PrivateRoute />}>
     <Route path='/profile' element={<ProfileScreen />} />
     </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>
);
