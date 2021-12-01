import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './routing/PrivateRoute';

import { loadUser } from './actions/auth';
import { setAuthToken } from './utils/setAuthToken';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Navbar />
      <Route path='/' exact component={Landing} />
      <section className='container'>
        <Alert />
        <Switch>
          <Route path='/register' exact component={Register} />
          <Route path='/login' exact component={Login} />
          <PrivateRoute path='/dashboard' exact component={Dashboard} />
          <PrivateRoute
            path='/create-profile'
            exact
            component={CreateProfile}
          />
          <PrivateRoute path='/edit-profile' exact component={EditProfile} />
          <PrivateRoute
            path='/add-experience'
            exact
            component={AddExperience}
          />
          <PrivateRoute path='/add-education' exact component={AddEducation} />
        </Switch>
      </section>
    </Router>
  );
};

export default App;
