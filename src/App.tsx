import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateSequencDiagram from 'screens/createSequencDiagram';
import Diagrams from 'screens/diagrams';
import Index from 'screens/index';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/diagrams/:type" element={<Diagrams />} />
        <Route
          path="/diagram/sequence/create"
          element={<CreateSequencDiagram />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
