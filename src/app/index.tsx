import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import '@app/app.css';
import Literals from './utils/Literals';

const App: React.FunctionComponent = () => (
  <Router basename={Literals.BASE_URL}>
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  </Router>
)

export default App;