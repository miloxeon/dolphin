import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';

import App from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import NavAnchor from './NavAnchor.jsx';
import Menu from 'grommet/components/Menu';

const Base = ({ children }) => (
    <App>
      <Header pad="medium">
        <Title>
          <IndexLink to="/">
            Dolphin
          </IndexLink>
        </Title>
        
        {Auth.isUserAuthenticated() ? (
          <Menu responsive={true}
            inline={true}
            flex={true}
            direction='row'
            justify='end'>
            <NavAnchor path="/logout">
              Log out
            </NavAnchor>
          </Menu>
        ) : (
          <Menu responsive={true}
            inline={true}
            flex={true}
            direction='row'
            justify='end'>
            <NavAnchor path="/login">
              Login
            </NavAnchor>
            <NavAnchor path="/signup">
              Sign up
            </NavAnchor>
          </Menu>
        )}
      </Header>
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