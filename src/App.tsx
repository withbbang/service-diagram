import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateEntityRelationshipDiagram from 'screens/createEntityRelationshipDiagram';
import CreateFlowDiagram from 'screens/createFlowDiagram';
import CreateSequencDiagram from 'screens/createSequenceDiagram';
import CreateMermaid from 'screens/createMermaid';
import Diagrams from 'screens/diagrams';
import Index from 'screens/index';
import NotFound from 'screens/notFound';
import ViewEntityRelationshipDiagram from 'screens/viewEntityRelationshipDiagram';
import ViewFlowDiagram from 'screens/viewFlowDiagram';
import ViewSequenceDiagram from 'screens/viewSequenceDiagram';
import ViewMermaid from 'screens/viewMermaid';
import UpdateEntityRelationshipDiagram from 'screens/updateEntityRelationshipDiagram';
import UpdateFlowDiagram from 'screens/updateFlowDiagram';
import UpdateSequencDiagram from 'screens/updateSequenceDiagram';
import SignIn from 'screens/signIn';
import SignUp from 'screens/signUp';
import SearchDiagrams from 'screens/searchDiagrams';
import UpdateMermaid from 'screens/updateMermaid';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/diagrams/:type" element={<Diagrams />} />
        <Route path="/diagram/sequence/:id" element={<ViewSequenceDiagram />} />
        <Route path="/diagram/flow/:id" element={<ViewFlowDiagram />} />
        <Route
          path="/diagram/entity-relationship/:id"
          element={<ViewEntityRelationshipDiagram />}
        />
        <Route path="/diagram/mermaid/:id" element={<ViewMermaid />} />
        <Route
          path="/diagram/sequence/create"
          element={<CreateSequencDiagram />}
        />
        <Route path="/diagram/flow/create" element={<CreateFlowDiagram />} />
        <Route
          path="/diagram/entity-relationship/create"
          element={<CreateEntityRelationshipDiagram />}
        />
        <Route path="/diagram/mermaid/create" element={<CreateMermaid />} />
        <Route
          path="/diagram/sequence/update/:contentId"
          element={<UpdateSequencDiagram />}
        />
        <Route
          path="/diagram/flow/update/:contentId"
          element={<UpdateFlowDiagram />}
        />
        <Route
          path="/diagram/entity-relationship/update/:contentId"
          element={<UpdateEntityRelationshipDiagram />}
        />
        <Route
          path="/diagram/mermaid/update/:contentId"
          element={<UpdateMermaid />}
        />
        <Route path="/sign/in" element={<SignIn />} />
        <Route path="/sign/up" element={<SignUp />} />
        <Route path="/search" element={<SearchDiagrams />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
