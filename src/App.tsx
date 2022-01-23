import Toaster from 'components/_shared/Toaster/Toaster';
import ToasterProvider from 'contexts/ToasterContext/ToasterProvider';
import { pages } from 'commons/navigation';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from 'components/Home/Home';
import ErrorBoundary from 'components/_shared/ErrorBoundry/ErrorBoundry';
import Container from '@mui/material/Container';

export const App = () => {
  return (
    <ErrorBoundary>
      <Container style={{ marginTop: '32px' }}>
        <ToasterProvider>
          <Router>
            <Switch>
              <Route path={[pages.HOME, pages.GRAPH, pages.TABLE]}>
                <Home />
              </Route>
            </Switch>
          </Router>
          <Toaster />
        </ToasterProvider>
      </Container>
    </ErrorBoundary>
  );
};
export default App;
