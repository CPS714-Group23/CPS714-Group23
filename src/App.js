import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav/Nav';
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import SignUp from './pages/signUp/signUp';
import Login from './pages/login/login';
import PharmaceuticalPortal from './pages/home/PharmaceuticalPortal';
import './App.css';

const routesConfig = [
  {
    path: '/',
    element: <PharmaceuticalPortal />, 
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/services',
    element: <Contact />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  }
];

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {routesConfig.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;