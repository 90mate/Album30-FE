import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KakaoLogin from './components/Login/Login';
import App from './App';

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/login" element={<KakaoLogin />}></Route>
        </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;