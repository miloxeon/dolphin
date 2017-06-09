import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';

import App from 'grommet/components/App';
import Header from './Header.jsx';

const Base = ({ children }) => (
    <App centered={false}>
      <Header />
      {children}
    </App>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
