import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from "./App";
import { Store } from './Store/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path='/user/add' exact element={<App />} />
        <Route path='/user/edit/:id' exact element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

