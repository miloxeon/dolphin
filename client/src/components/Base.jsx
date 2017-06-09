import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';

import App from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Header from './Header.jsx';

const Base = ({ children }) => (
    <App>
      <Header />
      <Article>
        <Section pad="medium">
          {children}
        </Section>
      </Article>
    </App>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
