import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainRoutes from './routes/main';
import CityContextProvider from './context/city';

function App() {
  return (
    <CityContextProvider>
      <MainRoutes />
    </CityContextProvider>
  );
}

export default App;
