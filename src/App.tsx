import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateErdDiagram from 'screens/createErdDiagram';
import CreateSequencDiagram from 'screens/createSequenceDiagram';
import Diagrams from 'screens/diagrams';
import Index from 'screens/index';
import NotFound from 'screens/notFound';

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
        <Route path="/diagram/erd/create" element={<CreateErdDiagram />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
