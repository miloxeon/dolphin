import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../modules/Auth';
import Sidebar from 'grommet/components/Sidebar';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Animate from 'grommet/components/Animate';
import Split from 'grommet/components/Split';
import Paragraph from 'grommet/components/Paragraph';


class Editor extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.downloadDiagram = this.downloadDiagram.bind(this);
    this.exportDiagram = this.exportDiagram.bind(this);
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    // console.log(this.props)
    this.dolphin = require('./editor_src');
  }

  componentWillReceiveProps(nextProps) {
    this.dolphin.loadDiagram(nextProps.diagram);
  }

  loadDiagram(e) {
    e.preventDefault();

  }

  saveDiagram(e) {
    e.preventDefault();

  }

  exportDiagram(e) {
    e.preventDefault();
    this.dolphin.exportDiagram();
  }

  downloadDiagram(e) {
    e.preventDefault();
    this.dolphin.downloadDiagram();
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <Split flex='right'
        separator={false}>
        <Animate 
        visible={true}
        enter={{"animation": "slide-right", "duration": 300}}
        keep={true}>
          <Sidebar size='small'>
            <Box flex='grow'
              justify='start'>
              <Menu primary>
                {Auth.isUserAuthenticated() ? (
                  <Anchor href='#' onClick={this.saveDiagram}>
                    Save
                  </Anchor>
                ) : (
                  null
                )}
                <Anchor href='#' onClick={this.loadDiagram}>
                  Open
                </Anchor>
                <Anchor href='#' onClick={this.exportDiagram}>
                  Export as SVG
                </Anchor>
                <Anchor href='#' onClick={this.downloadDiagram}>
                  Dowload
                </Anchor>
              </Menu>
              <Box pad="small">
                <Paragraph>
                  Add element: Click<br />
                  Edit element: Shift + click<br />
                  Delete element: Del<br />
                  <br />
                  Connect: Ctrl + drag<br />
                  Disconnect: Del<br />
                </Paragraph>
              </Box>
            </Box>
          </Sidebar>
        </Animate>
        <Box justify='center'
          align='center'>
          <div id="diagram"></div>
        </Box>
      </Split>
    );
  }

}

Editor.propTypes = {
  diagram: PropTypes.string.isRequired
};

export default Editor;
