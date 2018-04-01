/*eslint-disable react/no-multi-comp */
import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './components/Home'
import GamesList from './components/GamesList';
import SinglePlayerBoard from './components/SinglePlayerBoard';

//https://stackoverflow.com/a/43263057
function NavItem({children, to, exact, ...props}) {
    return (
      <Route
        path={to}
        exact={exact}
        children={({match}) => (
          <li className={match ? 'is-active' : null}>
            <Link
              to={to}
              { ...props }
            >{children}</Link>
          </li>
        )}
      />
    )
}

NavItem.propTypes = {
  children: PropTypes.node.isRequired,
  exact: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

function App() {
  return (
    <Router>
      <div className='app'>
        <div className='tabs is-centered'>
          <ul>
            <NavItem
              exact
              to='/'
            >
              { 'Home' }
            </NavItem>
            <NavItem to='/singleplayer' >
              { 'Single Player' }
            </NavItem>
            <NavItem to='/multiplayer'>
              { 'Multiplayer' }
            </NavItem>
          </ul>
        </div>

        <Route
          exact
          path='/'
          component={ Home }
        />
        <Route
          path='/singleplayer'
          component={ SinglePlayerBoard }
        />
        <Route
          path='/multiplayer'
          component={ GamesList }
        />
      </div>
    </Router>
  );
}

export default App
