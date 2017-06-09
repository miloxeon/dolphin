import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from 'grommet/components/Sidebar';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Animate from 'grommet/components/Animate';

const Dashboard = ({ secretData }) => (
  <div>
    <Animate 
        visible={true}
        enter={{"animation": "slide-right", "duration": 300}}
        keep={true}>
        <Sidebar colorIndex='neutral-1' size='small'>
          <Box flex='grow'
            justify='start'>
            <Menu primary={true}>
              <Anchor href='#'>
                First
              </Anchor>
              <Anchor href='#'>
                Second
              </Anchor>
              <Anchor href='#'>
                Third
              </Anchor>
            </Menu>
          </Box>
        </Sidebar>
      </Animate>
  </div>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
