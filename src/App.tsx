import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from 'screens/index';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
