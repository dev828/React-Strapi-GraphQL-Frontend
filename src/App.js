import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './containers/Layout';
import Register from './containers/Auth/Register';
import Login from './containers/Auth/Login';

function App() {  
  return (
    <div className="App">
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Layout} />
      </Switch>
    </div>
  );
}

export default App;  
