import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import configureStore from './redux/store';
import Homepage from './pages/homePage/Homepage';
import Menu from './components/menu/menu';
import Beerspage from './pages/beersPage/Beerspage';
import Cartpage from './pages/cartPage/Cartpage';
import Detailspage from './pages/detailsPage/Detailspage';
import Registerpage from './pages/registerPage/Registerpage';
import Loginpage from './pages/loginPage/Loginpage';

const App = function () {
  return (
    <Provider store={configureStore()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/beers" element={<Beerspage />} />
          <Route path="/beer/:id" element={<Detailspage />} />
          <Route path="/cart/:id" element={<Cartpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/login" element={<Loginpage />} />
        </Routes>
        <Menu />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
