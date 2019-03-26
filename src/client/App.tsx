import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import * as Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { Loading as loading } from './components/Loading';
import store from './store';
import * as Styles from './index.css';

const Load = (loader: () => any) => (
  Loadable({ loader, loading })
);

const Home = Load(() => import('./components/Home'));
const About = Load(() => import('./components/About'));
let DevTools = (): null => (null);

if (!PRODUCTION) {
  DevTools = require('./components/DevTools').default;
}

const rootStore = store();

const Root = () => (
  <Provider store={rootStore}>
    <Router>
      <Link className={Styles.link} to="/">Home</Link>
      <Link className={Styles.link} to="/about">About</Link>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <DevTools />
    </Router>
  </Provider>
);

export default hot(Root);
