import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateEntityRelationshipDiagram from 'screens/createEntityRelationshipDiagram';
import CreateFlowDiagram from 'screens/createFlowDiagram';
import CreateSequencDiagram from 'screens/createSequenceDiagram';
import Diagrams from 'screens/diagrams';
import Index from 'screens/index';
import NotFound from 'screens/notFound';
import ViewEntityRelationshipDiagram from 'screens/viewEntityRelationshipDiagram';
import ViewFlowDiagram from 'screens/viewFlowDiagram';
import ViewSequenceDiagram from 'screens/viewSequenceDiagram';
import UpdateSequencDiagram from 'screens/updateSequenceDiagram';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/diagrams/:type" element={<Diagrams />} />
        <Route
          path="/diagrams/sequence/:id"
          element={<ViewSequenceDiagram />}
        />
        <Route path="/diagrams/flow/:id" element={<ViewFlowDiagram />} />
        <Route
          path="/diagrams/entity-relationship/:id"
          element={<ViewEntityRelationshipDiagram />}
        />
        <Route
          path="/diagram/sequence/create"
          element={<CreateSequencDiagram />}
        />
        <Route path="/diagram/flow/create" element={<CreateFlowDiagram />} />
        <Route
          path="/diagram/entity-relationship/create"
          element={<CreateEntityRelationshipDiagram />}
        />
        <Route
          path="/diagram/sequence/update/:id"
          element={<UpdateSequencDiagram />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
