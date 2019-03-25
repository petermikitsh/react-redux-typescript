import * as React from 'react';
import * as Styles from './index.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import * as Loadable from 'react-loadable';
import { Loading as loading } from './components/Loading';

const Load = (loader: () => any) => (
  Loadable({ loader, loading })
);

const Home = Load(() => import('./components/Home'));
const About = Load(() => import('./components/About'));

const Root = () => (
  <Router>
    <Link className={Styles.link} to="/">Home</Link>
    <Link className={Styles.link} to="/about">About</Link>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </Router>
);

export default hot(Root);
