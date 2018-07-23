// @flow

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Header from '../../header/components/Header';
import ProjectsContainer from '../../projects-container/components/ProjectsContainer';
import ProjectView from '../../project-view/components/ProjectView';
import CustomersContainer from '../../customers-container/components/CustomersContainer';
import PeopleContainer from '../../people-container/components/PeopleContainer';
import CustomerView from '../../customer-view/components/CustomerView';
import PersonView from '../../person-view/components/PersonView';
import NotFound from '../../not-found/components/NotFound';
import css from './Root.css';

const Root = () => (
  <div className={css.component}>
    <Router>
      <div className={css.routes}>
        <Header />
        <Switch>
          <Redirect exact from="/" to="/projects" />
          <Route exact path="/projects" component={ProjectsContainer} />
          <Route path="/projects/:id" component={ProjectView} />
          <Route
            path="/customers"
            exact={true}
            component={CustomersContainer}
          />
          <Route path="/customers/:id" component={CustomerView} />
          <Route path="/people" exact={true} component={PeopleContainer} />
          <Route path="/people/:id" component={PersonView} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default Root;
