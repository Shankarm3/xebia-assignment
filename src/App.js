import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import SearchPage from './components/SearchPage';

function App() {
  return (
  <Router>
    <div className="app-root">
      <div className="container">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/search" component={SearchPage} />
          </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;