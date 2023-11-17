import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav/Nav';
import SidePanel from './components/SidePanel/SidePanel';
import PortalNav from './components/PortalNav/PortalNav';
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import SignUp from './pages/signUp/signUp';
import Login from './pages/login/login';
import Profile from './pages/profile/profile';
import PharmaceuticalPortal from './pages/home/PharmaceuticalPortal';
import PharmaceuticalPortalLog from './pages/home-loggedin/PharmaceuticalPortalLog';
import './App.css';
import Scheduler from './pages/scheduler/scheduler';
import PrescriptionSubmit from './pages/prescription-submit/prescriptionsubmit';
import DrugInteractionChecker from './pages/drugInteractionChecker/drugInteractionChecker';
import DrugSupplyTracker from './pages/drugSupplyTrack/drugSupplyTrack';
import PrivateRoute from './privateroute';

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
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/scheduler',
    element: <Scheduler />, 
  },
  {
    path: '/prescriptionsubmit',
    element: <PrescriptionSubmit />, 
  },
  {
    path: '/drug-interaction-checker',
    element: <DrugInteractionChecker />, 
  },
  {
    path: '/drug-supply-tracker',
    element: <DrugSupplyTracker />, 
  }
];

function App() {    
  return (
    <>
      <Navbar /> 
      {/* <PortalNav />*/}
      {/* <SidePanel /> */}
      <Routes>
        {routesConfig.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route exact path='/home' element={<PrivateRoute/>}>
          <Route exact path='/home' component={PharmaceuticalPortalLog} />
        </Route>
      </Routes>
    </>
  );
}

export default App;