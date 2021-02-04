import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import About from './about/about';
import NotFound from './notFound/notFound';
import Projects from './projects/projects';

//TODO: add auth part
const AppRoutings: React.FC<any> = (props) => {
  return (
    <Switch>
      <Route path={`/projects`} component={Projects} />
      <Route path={`/about`} component={About} />
      <Route path={`/not-found`} component={NotFound} />
      <Redirect exact from="/" to={`/projects`} />
      <Redirect from="*" to={`/not-found`} />
    </Switch>
  );
};
  
export default AppRoutings;