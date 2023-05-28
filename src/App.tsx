import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateEntityRelationshipDiagram from 'screens/createEntityRelationshipdDiagram';
import CreateFlowDiagram from 'screens/createFlowDiagram';
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
        <Route path="/diagram/flow/create" element={<CreateFlowDiagram />} />
        <Route
          path="/diagram/entity-relationship/create"
          element={<CreateEntityRelationshipDiagram />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
