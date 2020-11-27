import React, { useEffect } from 'react';
import "./App.css"
import Home from './pages/Home/Home';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import PrivateRoute from "./components/HOC/PrivateRoute"
import {useDispatch, useSelector} from "react-redux"
import { isUserLoggedIn } from './actions/signinActions';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate, dispatch]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/admin/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
