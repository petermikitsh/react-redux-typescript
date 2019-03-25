import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Styles from './index.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import component from '@loadable/component';

const root = document.createElement('div');
document.body.appendChild(root);

const Home = component(() => import('./components/Home'));
const About = component(() => import('./components/About'));

const Root = () => (
  <Router>
    <Link className={Styles.link} to="/">Home</Link>
    <Link className={Styles.link} to="/about">About</Link>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </Router>
);

ReactDOM.render(<Root />, root);
